import { useState, useEffect, useCallback } from "react";
import {
  fetchKnowledge,
  uploadKnowledge,
  uploadBulkKnowledge,
  createKnowledge,
  updateKnowledge,
  deleteKnowledgeEntry,
  searchKnowledge,
  getKnowledgeStats,
} from "../services/knowledge.service";
import {
  KnowledgeEntry,
  KnowledgeData,
  BulkUploadData,
  KnowledgeStats,
} from "../types/knowledge.types";

const useKnowledge = () => {
  const [knowledgeList, setKnowledgeList] = useState<KnowledgeEntry[]>([]);
  const [stats, setStats] = useState<KnowledgeStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadKnowledge = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Loading knowledge base...");
      const data = await fetchKnowledge();
      console.log("✅ Knowledge loaded:", data.length, "FAQs");
      console.log("📊 Knowledge data:", data);
      setKnowledgeList(data);
    } catch (err: any) {
      console.error("❌ Error loading knowledge:", err);
      setError(err.message || "Failed to fetch knowledge entries");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      console.log("🔄 Loading stats...");
      const statsData = await getKnowledgeStats();
      console.log("✅ Stats loaded:", statsData);
      setStats(statsData);
    } catch (err: any) {
      console.error("❌ Error loading stats:", err);
    }
  }, []);

  useEffect(() => {
    loadKnowledge();
    loadStats();
  }, [loadKnowledge, loadStats]);

  const handleUpload = async (file: File, category?: string) => {
    setLoading(true);
    setError(null);
    try {
      await uploadKnowledge(file, category);
      await loadKnowledge();
      await loadStats();
    } catch (err: any) {
      setError(err.message || "Failed to upload knowledge entry");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async (data: BulkUploadData) => {
    setLoading(true);
    setError(null);
    try {
      await uploadBulkKnowledge(data);
      await loadKnowledge();
      await loadStats();
    } catch (err: any) {
      setError(err.message || "Failed to bulk upload knowledge");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addKnowledge = async (knowledgeData: KnowledgeData) => {
    setLoading(true);
    setError(null);
    try {
      const newEntry = await createKnowledge(knowledgeData);
      setKnowledgeList((prev) => [newEntry, ...prev]);
      await loadStats();
      return newEntry;
    } catch (err: any) {
      setError(err.message || "Failed to add knowledge entry");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editKnowledge = async (id: string, knowledgeData: KnowledgeData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEntry = await updateKnowledge(id, knowledgeData);
      setKnowledgeList((prev) =>
        prev.map((item) => (item.id === id ? updatedEntry : item))
      );
      await loadStats();
      return updatedEntry;
    } catch (err: any) {
      setError(err.message || "Failed to update knowledge entry");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeKnowledge = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteKnowledgeEntry(id);
      setKnowledgeList((prev) => prev.filter((item) => item.id !== id));
      await loadStats();
    } catch (err: any) {
      setError(err.message || "Failed to delete knowledge entry");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchKnowledgeEntries = async (query: string, category?: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchKnowledge(query, category);
      return results;
    } catch (err: any) {
      setError(err.message || "Failed to search knowledge entries");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    knowledgeList,
    knowledge: knowledgeList, // For backward compatibility
    stats,
    loading,
    error,
    handleUpload,
    handleBulkUpload,
    addKnowledge,
    editKnowledge,
    removeKnowledge,
    searchKnowledgeEntries,
    fetchKnowledge: loadKnowledge,
    refresh: loadKnowledge,
  };
};

export default useKnowledge;
