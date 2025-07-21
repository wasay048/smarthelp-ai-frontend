import React, { useState } from "react";

interface EmbedConfig {
  chatbotId: string;
  theme: "light" | "dark";
  width: string;
  height: string;
  position: "bottom-right" | "bottom-left" | "inline";
  primaryColor: string;
}

interface EmbedPreviewProps {
  embedCode: string;
  config: EmbedConfig;
}

const EmbedPreview: React.FC<EmbedPreviewProps> = ({ embedCode, config }) => {
  const [activeTab, setActiveTab] = useState<
    "script" | "iframe" | "instructions"
  >("script");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
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

  const getInstructions = (): string => {
    return `How to embed your chatbot:

1. Copy the embed code from the "Script" tab
2. Paste it into your website's HTML, preferably before the closing </body> tag
3. The chatbot will automatically appear on your website

Configuration:
- Theme: ${config.theme}
- Position: ${config.position}
- Dimensions: ${config.width} × ${config.height}
- Primary Color: ${config.primaryColor}

For the iframe version:
- Copy the code from the "Iframe" tab
- Paste it where you want the chatbot to appear inline
- Customize the dimensions as needed

Support:
If you need help with implementation, please contact our support team.`;
  };

  const getCurrentCode = (): string => {
    switch (activeTab) {
      case "script":
        return embedCode;
      case "iframe":
        return generateIframeCode();
      case "instructions":
        return getInstructions();
      default:
        return embedCode;
    }
  };

  if (!embedCode) {
    return (
      <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">
          Generate embed code to see the preview
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Configure your chatbot settings and click "Generate Embed Code"
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Embed Code Preview
          </h2>
          <button
            onClick={handleCopy}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              copied
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
            }`}
          >
            {copied ? (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab("script")}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === "script"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Script (Recommended)
          </button>
          <button
            onClick={() => setActiveTab("iframe")}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === "iframe"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Iframe
          </button>
          <button
            onClick={() => setActiveTab("instructions")}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === "instructions"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Instructions
          </button>
        </nav>
      </div>

      {/* Code Preview */}
      <div className="p-6">
        <div className="relative">
          <pre className="bg-gray-50 rounded-lg p-4 text-sm font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap border border-gray-200 min-h-[200px]">
            {getCurrentCode()}
          </pre>
        </div>

        {/* Configuration Summary */}
        {activeTab === "script" && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              Configuration Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Theme:</span>
                <span className="text-blue-800 ml-2 capitalize">
                  {config.theme}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Position:</span>
                <span className="text-blue-800 ml-2 capitalize">
                  {config.position.replace("-", " ")}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Dimensions:</span>
                <span className="text-blue-800 ml-2">
                  {config.width} × {config.height}
                </span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Color:</span>
                <span className="text-blue-800 ml-2 flex items-center">
                  <span
                    className="w-4 h-4 rounded-full mr-2 border border-blue-300"
                    data-color={config.primaryColor}
                  />
                  {config.primaryColor}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Usage Tips */}
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <h3 className="text-sm font-medium text-amber-900 mb-2">
            💡 Usage Tips
          </h3>
          <ul className="text-sm text-amber-800 space-y-1">
            {activeTab === "script" && (
              <>
                <li>
                  • Add the script code before the closing &lt;/body&gt; tag
                </li>
                <li>
                  • The chatbot will load automatically when the page loads
                </li>
                <li>• Supports both floating and inline positioning</li>
              </>
            )}
            {activeTab === "iframe" && (
              <>
                <li>
                  • Place the iframe code where you want the chatbot to appear
                </li>
                <li>• Adjust width and height attributes as needed</li>
                <li>• Works well for inline embedding</li>
              </>
            )}
            {activeTab === "instructions" && (
              <>
                <li>• Test the chatbot on a staging environment first</li>
                <li>• Ensure your website has proper HTTPS</li>
                <li>• Contact support if you encounter any issues</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmbedPreview;
