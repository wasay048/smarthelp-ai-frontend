export interface KnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  title?: string; // For backward compatibility
  content?: string; // For backward compatibility
}

export interface KnowledgeData {
  question: string;
  answer: string;
  category?: string;
}

export interface KnowledgeUploadResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface BulkUploadData {
  textContent: string;
  category?: string;
}

export interface KnowledgeSearchQuery {
  query: string;
  category?: string;
  limit?: number;
}

export interface KnowledgeStats {
  totalFAQs: number;
  categoryCounts: { [category: string]: number };
}
