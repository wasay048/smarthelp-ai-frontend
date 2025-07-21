import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "../../types/chat.types";

interface ChatHistoryProps {
  messages: ChatMessageType[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-lg font-medium text-gray-900 mb-2">
            No messages yet
          </p>
          <p className="text-gray-600">
            Start a conversation to see your chat history here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={
              message.id ||
              `${message.timestamp}-${message.content.substring(0, 10)}`
            }
            message={message.content}
            isUserMessage={message.sender === "user"}
          />
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatHistory;
