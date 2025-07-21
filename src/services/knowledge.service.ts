import axios from "axios";
import {
  KnowledgeEntry,
  KnowledgeData,
  BulkUploadData,
  KnowledgeStats,
} from "../types/knowledge.types";

const API_URL = "http://localhost:5000/api/knowledge";

// Get auth token
const getAuthToken = () => localStorage.getItem("authToken");

// Create axios instance with auth
const createAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
    "Content-Type": "application/json",
  },
});

const createFileUploadConfig = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
    "Content-Type": "multipart/form-data",
  },
});

export const fetchKnowledge = async (): Promise<KnowledgeEntry[]> => {
  try {
    const response = await axios.get(`${API_URL}/`, createAuthConfig());

    // Transform backend FAQ format to frontend knowledge format
    return response.data.data.map((faq: any) => ({
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "General",
      createdAt: faq.createdAt,
      updatedAt: faq.updatedAt,
      title: faq.question, // Use question as title for compatibility
      content: faq.answer, // Use answer as content for compatibility
    }));
  } catch (error: any) {
    console.error("Error fetching knowledge:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch knowledge"
    );
  }
};

export const uploadKnowledge = async (
  file: File,
  category?: string
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (category) {
      formData.append("category", category);
    }

    const response = await axios.post(
      `${API_URL}/upload/file`,
      formData,
      createFileUploadConfig()
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Upload failed");
    }
  } catch (error: any) {
    console.error("Error uploading knowledge:", error);
    throw new Error(
      error.response?.data?.message || "Failed to upload knowledge"
    );
  }
};

export const uploadBulkKnowledge = async (
  data: BulkUploadData
): Promise<void> => {
  try {
    const response = await axios.post(
      `${API_URL}/upload/bulk`,
      data,
      createAuthConfig()
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Bulk upload failed");
    }
  } catch (error: any) {
    console.error("Error bulk uploading knowledge:", error);
    throw new Error(
      error.response?.data?.message || "Failed to bulk upload knowledge"
    );
  }
};

export const createKnowledge = async (
  knowledgeData: KnowledgeData
): Promise<KnowledgeEntry> => {
  try {
    const response = await axios.post(
      `${API_URL}/upload`,
      knowledgeData,
      createAuthConfig()
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to create knowledge");
    }

    const faq = response.data.data;
    return {
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "General",
      createdAt: faq.createdAt,
      updatedAt: faq.updatedAt,
      title: faq.question,
      content: faq.answer,
    };
  } catch (error: any) {
    console.error("Error creating knowledge:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create knowledge"
    );
  }
};

export const updateKnowledge = async (
  id: string,
  knowledgeData: KnowledgeData
): Promise<KnowledgeEntry> => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      knowledgeData,
      createAuthConfig()
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update knowledge");
    }

    const faq = response.data.data;
    return {
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "General",
      createdAt: faq.createdAt,
      updatedAt: faq.updatedAt,
      title: faq.question,
      content: faq.answer,
    };
  } catch (error: any) {
    console.error("Error updating knowledge:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update knowledge"
    );
  }
};

export const deleteKnowledgeEntry = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, createAuthConfig());

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete knowledge");
    }
  } catch (error: any) {
    console.error("Error deleting knowledge:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete knowledge"
    );
  }
};

export const searchKnowledge = async (
  query: string,
  category?: string
): Promise<KnowledgeEntry[]> => {
  try {
    const params = new URLSearchParams();
    params.append("search", query);
    if (category) {
      params.append("category", category);
    }

    const response = await axios.get(
      `${API_URL}/?${params.toString()}`,
      createAuthConfig()
    );

    return response.data.data.map((faq: any) => ({
      id: faq._id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "General",
      createdAt: faq.createdAt,
      updatedAt: faq.updatedAt,
      title: faq.question,
      content: faq.answer,
    }));
  } catch (error: any) {
    console.error("Error searching knowledge:", error);
    throw new Error(
      error.response?.data?.message || "Failed to search knowledge"
    );
  }
};

export const getKnowledgeStats = async (): Promise<KnowledgeStats> => {
  try {
    const response = await axios.get(`${API_URL}/stats`, createAuthConfig());

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to get knowledge stats");
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Error getting knowledge stats:", error);
    throw new Error(
      error.response?.data?.message || "Failed to get knowledge stats"
    );
  }
};
