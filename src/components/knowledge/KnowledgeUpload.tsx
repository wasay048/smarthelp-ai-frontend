import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import useKnowledge from "../../hooks/useKnowledge";
import { useAuth } from "../../hooks/useAuth";

interface KnowledgeUploadProps {
  onUploadSuccess?: () => void;
}

const KnowledgeUpload: React.FC<KnowledgeUploadProps> = ({
  onUploadSuccess,
}) => {
  const { user } = useAuth();
  const { handleUpload, handleBulkUpload } = useKnowledge();
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState<string>("");
  const [category, setCategory] = useState<string>("General");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"file" | "text">("file");
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      setFile(droppedFile);
    }
  };

  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      "text/plain",
      "application/pdf",
      "text/csv",
      "application/json",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid file type (TXT, PDF, CSV, JSON)");
      return false;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 10MB");
      return false;
    }

    return true;
  };

  const handleUploadAction = async () => {
    if (!category.trim()) {
      alert("Please provide a category for your knowledge");
      return;
    }

    setIsUploading(true);

    try {
      if (uploadMethod === "file" && file) {
        if (!validateFile(file)) {
          setIsUploading(false);
          return;
        }
        await handleUpload(file, category);
      } else if (uploadMethod === "text" && textContent.trim()) {
        await handleBulkUpload({
          textContent,
          category,
        });
      } else {
        alert("Please provide either a file or text content");
        setIsUploading(false);
        return;
      }

      // Reset form
      setFile(null);
      setTextContent("");
      setCategory("General");

      // Call success callback
      if (onUploadSuccess) {
        onUploadSuccess();
      }

      alert("Knowledge uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Add Knowledge</h2>
        <div className="flex rounded-md shadow-sm">
          <button
            onClick={() => setUploadMethod("file")}
            className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
              uploadMethod === "file"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setUploadMethod("text")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
              uploadMethod === "text"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Paste FAQ Text
          </button>
        </div>
      </div>

      {/* Category Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <Input
          type="text"
          placeholder="e.g., MongoDB, General, Technical Support"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full"
        />
        <p className="text-sm text-gray-500 mt-1">
          Categorize your knowledge for better organization
        </p>
      </div>

      {uploadMethod === "file" ? (
        <div className="space-y-4">
          {/* File Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              {file ? file.name : "Upload FAQ file"}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                : "or drag and drop your FAQ document"}
            </p>
            <div className="flex items-center justify-center">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                <span>Choose File</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".txt,.pdf,.csv,.json"
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: TXT, PDF, CSV, JSON (max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              FAQ Content *
            </label>
            <textarea
              placeholder="Paste your FAQ content here. Supported formats:&#10;&#10;1. Q: What is MongoDB?&#10;   A: MongoDB is a NoSQL database...&#10;&#10;2. Q: How to install MongoDB?&#10;   A: You can install MongoDB by..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
            <p className="text-sm text-gray-500 mt-1">
              {textContent.length} characters • Use format: "Q: question"
              followed by "A: answer"
            </p>
          </div>

          {/* Format Examples */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Supported FAQ Formats:
            </h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div>
                <strong>Numbered format:</strong>
                <pre className="mt-1 text-xs bg-white p-2 rounded border">
                  {`1. Q: What is MongoDB?
   A: MongoDB is a NoSQL database...

2. Q: How to install it?
   A: Download from mongodb.com...`}
                </pre>
              </div>
              <div>
                <strong>Simple format:</strong>
                <pre className="mt-1 text-xs bg-white p-2 rounded border">
                  {`Q: What is MongoDB?
A: MongoDB is a NoSQL database...

Q: How to install it?
A: Download from mongodb.com...`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleUploadAction}
          loading={isUploading}
          disabled={
            isUploading || (!file && !textContent.trim()) || !category.trim()
          }
          variant="primary"
          size="large"
        >
          {isUploading
            ? uploadMethod === "file"
              ? "Uploading File..."
              : "Processing FAQs..."
            : "Add to Knowledge Base"}
        </Button>
      </div>
    </div>
  );
};

export default KnowledgeUpload;
