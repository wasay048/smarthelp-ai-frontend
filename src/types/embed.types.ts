export interface EmbedCode {
  id?: string;
  userId?: string;
  theme: "light" | "dark";
  position: "bottom-right" | "bottom-left" | "inline";
  primaryColor: string;
  width: string;
  height: string;
  title?: string;
  welcomeMessage?: string;
  placeholder?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmbedConfig {
  theme: "light" | "dark";
  position: "bottom-right" | "bottom-left" | "inline";
  primaryColor: string;
  width: string;
  height: string;
  title: string;
  welcomeMessage: string;
  placeholder: string;
}

export interface EmbedResponse {
  success: boolean;
  embedCode: string;
  config: EmbedConfig;
  error?: string;
}
