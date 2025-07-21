export const API_BASE_URL = 'https://api.smarthelp.ai'; // Base URL for API calls
export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // Maximum upload size in bytes (5 MB)
export const SUPPORTED_FILE_TYPES = ['application/pdf', 'text/plain']; // Supported file types for upload
export const CHAT_HISTORY_LIMIT = 100; // Maximum number of chat messages to store
export const DEFAULT_CHAT_MESSAGE = 'How can I assist you today?'; // Default message for chat interface
export const EMBED_CODE_TEMPLATE = `<iframe src="${API_BASE_URL}/embed" width="100%" height="500px"></iframe>`; // Template for embed code