export interface ChatMessage {
  id: string;
  message: string;
  response?: string;
  userId?: string;
  timestamp: string;
  isBot: boolean;
  status?: "sending" | "sent" | "failed";
}

export interface ChatHistory {
  messages: ChatMessage[];
  totalCount: number;
}

export interface ChatResponse {
  success: boolean;
  data: ChatMessage;
  error?: string;
}
