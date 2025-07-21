import React from "react";

interface ChatMessageProps {
  message: string;
  isUserMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUserMessage,
}) => {
  return (
    <div
      className={`chat-message ${
        isUserMessage ? "user-message" : "bot-message"
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default ChatMessage;
