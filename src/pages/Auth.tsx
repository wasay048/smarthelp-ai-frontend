import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Spinner from "../components/ui/Spinner";

const Auth: React.FC = () => {
  const { login, register, loading, error, user, clearError } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [justRegistered, setJustRegistered] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  // Redirect to dashboard if user is already authenticated (but not if just registered)
  useEffect(() => {
    if (user && !justRegistered && !loading) {
      navigate("/dashboard");
    }
  }, [user, navigate, justRegistered, loading]);

  // Show loading spinner while checking authentication
  if (loading && !user && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Spinner />
      </div>
    );
  }

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setValidationErrors({});
    setSuccessMessage("");
    // Clear error - clearError is now available from useAuth
    clearError();
  };

  const validateForm = () => {
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      errors.username = "Email is required";
    } else if (username.length < 3) {
      errors.username = "Email must be at least 3 characters";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Clear previous messages
    setSuccessMessage("");

    try {
      if (isRegistering) {
        await register(username, password);
        // On successful registration, show success message and switch to login
        setSuccessMessage(
          "Account created successfully! Please sign in with your credentials."
        );
        setJustRegistered(true); // Mark that user just registered
        setIsRegistering(false);
        resetForm();
      } else {
        await login(username, password);
        setJustRegistered(false); // Reset the flag on login
        // User will be redirected by useEffect when user state updates
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setJustRegistered(false); // Reset flag on error
      // Error is handled by the useAuth hook
    }
  };

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
    setJustRegistered(false); // Reset the flag when switching modes
    resetForm();
  };

  const handleDemoUser = () => {
    setUsername("demo@smarthelp.com");
    setPassword("12345@smarthelp");
    setValidationErrors({});
    clearError();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
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
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegistering ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegistering
              ? "Join SmartHelp.AI and start building your FAQ chatbot"
              : "Welcome back to SmartHelp.AI"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                id="username"
                label="Email"
                type="email"
                placeholder="Enter your email address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={validationErrors.username}
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div>
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={validationErrors.password}
                disabled={loading}
                autoComplete={
                  isRegistering ? "new-password" : "current-password"
                }
              />
            </div>
          </div>

          {/* Demo User Button - Only show for login */}
          {!isRegistering && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleDemoUser}
                className="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={loading}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Try Demo User
              </button>
              <p className="mt-2 text-xs text-gray-500">
                Click to fill in demo credentials automatically
              </p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Success!
                  </h3>
                  <div className="mt-1 text-sm text-green-700">
                    {successMessage}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {isRegistering
                      ? "Registration Error"
                      : "Authentication Error"}
                  </h3>
                  <div className="mt-1 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={loading}
              className="w-full"
              disabled={loading}
            >
              {loading
                ? isRegistering
                  ? "Creating account..."
                  : "Signing in..."
                : isRegistering
                  ? "Create Account"
                  : "Sign In"}
            </Button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleToggleMode}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors text-sm"
              disabled={loading}
            >
              {isRegistering
                ? "Already have an account? Sign in"
                : "Need an account? Create one"}
            </button>
          </div>

          {/* Additional information for registration */}
          {isRegistering && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="text-sm text-blue-700">
                <h4 className="font-medium mb-2">Account Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Username must be at least 3 characters long</li>
                  <li>Password must be at least 6 characters long</li>
                  <li>Choose a unique username for your account</li>
                </ul>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
