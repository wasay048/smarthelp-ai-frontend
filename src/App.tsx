import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Knowledge from "./pages/Knowledge";
import Embed from "./pages/Embed";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import ErrorBoundary from "./components/ErrorBoundry";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            {/* Public routes with header */}
            <Route
              path="/auth"
              element={
                <Layout>
                  <Auth />
                </Layout>
              }
            />

            {/* Protected routes with header */}
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Dashboard />
                    </ErrorBoundary>
                  </ProtectedRoute>
                </Layout>
              }
            />

            <Route
              path="/chat"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                </Layout>
              }
            />

            <Route
              path="/knowledge"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Knowledge />
                  </ProtectedRoute>
                </Layout>
              }
            />

            <Route
              path="/embed"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Embed />
                  </ProtectedRoute>
                </Layout>
              }
            />

            <Route
              path="/profile"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </Layout>
              }
            />

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
