import React from "react";
import ChatInterface from "../components/chat/ChatInterface";

const Chat: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Chat Assistant
        </h1>
        <p className="text-gray-600">Chat with your AI-powered FAQ assistant</p>
      </div>
      <ChatInterface />
    </div>
  );
};

export default Chat;
