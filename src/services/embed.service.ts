import axios from "axios";
import { EmbedCode } from "../types/embed.types";

const API_URL = "http://localhost:5000/api/embed"; // Updated to use port 5000

// Function to generate embed code
export const generateEmbedCode = async (data: EmbedCode): Promise<string> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${API_URL}/generate`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.embedCode;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error("Error generating embed code: " + errorMessage);
  }
};

// Function to fetch embed code details
export const fetchEmbedCodeDetails = async (id: string): Promise<EmbedCode> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error("Error fetching embed code details: " + errorMessage);
  }
};
