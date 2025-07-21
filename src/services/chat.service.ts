import axios from "axios";
import { ChatMessage } from "../types/chat.types";

const API_URL = "http://localhost:5000/api/chat";

export const sendMessage = async (
  message: string,
  userId?: string
): Promise<ChatMessage> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${API_URL}/send`,
      {
        message,
        userId: userId || "anonymous",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      id: Date.now().toString(),
      message: message,
      response: response.data.response,
      userId: userId || "anonymous",
      timestamp: new Date().toISOString(),
      isBot: false,
    };
  } catch (error: any) {
    console.error("Error sending message:", error);
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
};

export const getChatHistory = async (
  userId?: string
): Promise<ChatMessage[]> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${API_URL}/history/${userId || "anonymous"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.history || [];
  } catch (error: any) {
    console.error("Error fetching chat history:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch chat history"
    );
  }
};

export const clearChatHistory = async (userId?: string): Promise<void> => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`${API_URL}/history/${userId || "anonymous"}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error("Error clearing chat history:", error);
    throw new Error(
      error.response?.data?.message || "Failed to clear chat history"
    );
  }
};
