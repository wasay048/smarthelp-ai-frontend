import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://5.161.120.206/smarthelp/api", // Updated to match your backend port
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally
    if (error.response) {
      console.error("API Error:", error.response.data);
      // You can add more error handling logic here
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("authToken");
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

// Example API call function
export const fetchData = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

// Export the apiClient for use in other services
export default apiClient;
