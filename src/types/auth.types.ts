export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    email?: string;
    role?: string;
  };
  username?: string; // For backward compatibility
  role?: string; // For backward compatibility
}

export interface User {
  id: string;
  username: string;
  email?: string;
  role?: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role?: string;
  };
}
