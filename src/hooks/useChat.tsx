import { useState, useCallback } from "react";
import {
  sendMessage,
  getChatHistory,
  clearChatHistory,
} from "../services/chat.service";
import { ChatMessage } from "../types/chat.types";

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string, userId?: string) => Promise<void>;
  clearHistory: (userId?: string) => Promise<void>;
  loadHistory: (userId?: string) => Promise<void>;
}

const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = useCallback(
    async (message: string, userId?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await sendMessage(message, userId);
        setMessages((prev) => [...prev, response]);
      } catch (err: any) {
        setError(err.message || "Failed to send message");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleClearHistory = useCallback(async (userId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await clearChatHistory(userId);
      setMessages([]);
    } catch (err: any) {
      setError(err.message || "Failed to clear chat history");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadHistory = useCallback(async (userId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const history = await getChatHistory(userId);
      setMessages(history);
    } catch (err: any) {
      setError(err.message || "Failed to load chat history");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage: handleSendMessage,
    clearHistory: handleClearHistory,
    loadHistory: handleLoadHistory,
  };
};

export default useChat;
