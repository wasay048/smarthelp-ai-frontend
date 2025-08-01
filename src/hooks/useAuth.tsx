import { useState, useEffect } from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getCurrentUser,
} from "../services/auth.service";
import { AuthResponse } from "../types/auth.types";

const useAuth = () => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          // Validate the token by making a request to getCurrentUser
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // If token validation fails, clear everything
        localStorage.removeItem("authToken");
        setUser(null);
        setError(null); // Don't show error on page refresh
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginService({ email: username, password });
      setUser(response);
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }
      setError(null); // Clear any previous errors
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      // Clear any invalid token from localStorage
      localStorage.removeItem("authToken");
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerService({ email: username, password });
      // Don't automatically log in after registration
      // Just return success - the component will handle the UI transition
      setError(null); // Clear any previous errors
      return response;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutService();
      setUser(null);
      setError(null);
      localStorage.removeItem("authToken");
    } catch (err: any) {
      console.error("Logout error:", err);
      // Even if logout fails, clear local state
      setUser(null);
      setError(null);
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  };
};

export { useAuth };
export default useAuth;
