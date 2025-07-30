import axios from "axios";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth.types";

const API_URL = "http://5.161.120.206/smarthelp/api/auth"; // Updated to use port 5000

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem("authToken", response.data.token);
  }
  return response.data;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, credentials);
  if (response.data.token) {
    localStorage.setItem("authToken", response.data.token);
  }
  return response.data;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("authToken");

  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    console.log("Logout endpoint not available");
  }
};

export const getCurrentUser = async (): Promise<AuthResponse | null> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const response = await axios.get(`${API_URL}/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem("authToken");
    return null;
  }
};
