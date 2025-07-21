import React, { useState } from "react";
import EmbedCodeGenerator from "../components/embed/EmbedCodeGenerator";
import EmbedPreview from "../components/embed/EmbedPreview";
import { useAuth } from "../hooks/useAuth";

interface EmbedConfig {
  chatbotId: string;
  theme: "light" | "dark";
  width: string;
  height: string;
  position: "bottom-right" | "bottom-left" | "inline";
  primaryColor: string;
}

const Embed: React.FC = () => {
  const { user } = useAuth();
  const [embedCode, setEmbedCode] = useState<string>("");
  const [config, setConfig] = useState<EmbedConfig>({
    chatbotId: user?.user?.id || "default",
    theme: "light",
    width: "400px",
    height: "600px",
    position: "bottom-right",
    primaryColor: "#3B82F6",
  });

  const handleCodeGenerated = (code: string, newConfig: EmbedConfig) => {
    setEmbedCode(code);
    setConfig(newConfig);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600">
            Please log in to generate embed codes for your chatbot.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Embed Your Chatbot
          </h1>
          <p className="mt-2 text-gray-600">
            Generate embed codes to integrate your SmartHelp.AI chatbot into
            your website.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Code Generator */}
          <div className="space-y-6">
            <EmbedCodeGenerator onCodeGenerated={handleCodeGenerated} />

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Floating Widget
                    </p>
                    <p className="text-sm text-gray-600">
                      Appears as a floating button on your website
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Inline Embedding
                    </p>
                    <p className="text-sm text-gray-600">
                      Embed directly into your page content
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Customizable Theme
                    </p>
                    <p className="text-sm text-gray-600">
                      Light and dark themes to match your brand
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Responsive Design
                    </p>
                    <p className="text-sm text-gray-600">
                      Works perfectly on desktop and mobile devices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <EmbedPreview embedCode={embedCode} config={config} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Embed;
