import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface EmbedCodeGeneratorProps {
  onCodeGenerated: (code: string, config: EmbedConfig) => void;
}

interface EmbedConfig {
  chatbotId: string;
  theme: "light" | "dark";
  width: string;
  height: string;
  position: "bottom-right" | "bottom-left" | "inline";
  primaryColor: string;
}

const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({
  onCodeGenerated,
}) => {
  const { user } = useAuth();
  const [config, setConfig] = useState<EmbedConfig>({
    chatbotId: user?.user?.id || "default",
    theme: "light",
    width: "400px",
    height: "600px",
    position: "bottom-right",
    primaryColor: "#3B82F6",
  });
  const [siteUrl, setSiteUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateEmbedCode = async () => {
    if (!siteUrl.trim()) {
      alert("Please enter a website URL");
      return;
    }

    if (!validateUrl(siteUrl)) {
      alert("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setIsGenerating(true);

    try {
      // Generate different types of embed codes
      const iframeCode = generateIframeCode();
      const scriptCode = generateScriptCode();
      const widgetCode = generateWidgetCode();

      const fullCode = `${scriptCode}\n\n${widgetCode}`;

      onCodeGenerated(fullCode, config);
    } catch (error) {
      console.error("Error generating embed code:", error);
      alert("Failed to generate embed code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateIframeCode = (): string => {
    const baseUrl = window.location.origin;
    return `<iframe 
  src="${baseUrl}/embed?chatbotId=${config.chatbotId}&theme=${
      config.theme
    }&primaryColor=${encodeURIComponent(config.primaryColor)}"
  width="${config.width}" 
  height="${config.height}" 
  frameborder="0"
  title="SmartHelp.AI Chatbot"
  allow="microphone; camera"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>`;
  };

  const generateScriptCode = (): string => {
    const baseUrl = window.location.origin;
    return `<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${baseUrl}/embed-widget.js';
    script.async = true;
    script.setAttribute('data-chatbot-id', '${config.chatbotId}');
    script.setAttribute('data-theme', '${config.theme}');
    script.setAttribute('data-position', '${config.position}');
    script.setAttribute('data-primary-color', '${config.primaryColor}');
    document.head.appendChild(script);
  })();
</script>`;
  };

  const generateWidgetCode = (): string => {
    if (config.position === "inline") {
      return `<!-- Place this div where you want the chatbot to appear -->
<div id="smarthelp-chatbot" 
     data-chatbot-id="${config.chatbotId}"
     data-theme="${config.theme}"
     data-width="${config.width}"
     data-height="${config.height}"
     data-primary-color="${config.primaryColor}">
</div>`;
    }
    return `<!-- The chatbot will appear as a floating widget -->`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Generate Embed Code
      </h2>

      <div className="space-y-6">
        {/* Website URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <Input
            type="url"
            placeholder="https://yourwebsite.com"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="w-full"
          />
          <p className="mt-1 text-sm text-gray-500">
            The URL where you'll embed the chatbot
          </p>
        </div>

        {/* Theme Selection */}
        <div>
          <label
            htmlFor="theme-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Theme
          </label>
          <select
            id="theme-select"
            value={config.theme}
            onChange={(e) =>
              setConfig({
                ...config,
                theme: e.target.value as "light" | "dark",
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Position Selection */}
        <div>
          <label
            htmlFor="position-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Position
          </label>
          <select
            id="position-select"
            value={config.position}
            onChange={(e) =>
              setConfig({ ...config, position: e.target.value as any })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bottom-right">Bottom Right (Floating)</option>
            <option value="bottom-left">Bottom Left (Floating)</option>
            <option value="inline">Inline (Embedded)</option>
          </select>
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width
            </label>
            <Input
              type="text"
              placeholder="400px"
              value={config.width}
              onChange={(e) => setConfig({ ...config, width: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <Input
              type="text"
              placeholder="600px"
              value={config.height}
              onChange={(e) => setConfig({ ...config, height: e.target.value })}
            />
          </div>
        </div>

        {/* Primary Color */}
        <div>
          <label
            htmlFor="color-picker"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Primary Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="color-picker"
              type="color"
              value={config.primaryColor}
              onChange={(e) =>
                setConfig({ ...config, primaryColor: e.target.value })
              }
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              title="Select primary color"
            />
            <Input
              type="text"
              value={config.primaryColor}
              onChange={(e) =>
                setConfig({ ...config, primaryColor: e.target.value })
              }
              placeholder="#3B82F6"
              className="flex-1"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateEmbedCode}
          disabled={isGenerating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </div>
          ) : (
            "Generate Embed Code"
          )}
        </button>
      </div>
    </div>
  );
};

export default EmbedCodeGenerator;
