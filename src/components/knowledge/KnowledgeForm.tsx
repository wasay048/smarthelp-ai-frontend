import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import useKnowledge from "../../hooks/useKnowledge";
import { useAuth } from "../../hooks/useAuth";

interface KnowledgeFormProps {
  onAddSuccess?: () => void;
}

const KnowledgeForm: React.FC<KnowledgeFormProps> = ({ onAddSuccess }) => {
  const { user } = useAuth();
  const { addKnowledge } = useKnowledge();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      alert("Please fill in both question and answer fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const knowledgeData = {
        question: question.trim(),
        answer: answer.trim(),
        category: category.trim() || "General",
      };

      await addKnowledge(knowledgeData);

      // Reset form
      setQuestion("");
      setAnswer("");
      setCategory("General");

      // Call success callback
      if (onAddSuccess) {
        onAddSuccess();
      }

      alert("FAQ added successfully!");
    } catch (error) {
      console.error("Error adding knowledge:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Add FAQ Manually
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Create individual FAQ entries manually
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question *
          </label>
          <Input
            type="text"
            placeholder="What question are you answering?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Write the question as users would typically ask it
          </p>
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Answer *
          </label>
          <textarea
            placeholder="Provide a comprehensive answer to the question..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            {answer.length} characters • Provide detailed, helpful information
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Input
            type="text"
            placeholder="e.g., MongoDB, General, Technical, Billing"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Categorize for better organization and filtering
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting || !question.trim() || !answer.trim()}
            variant="primary"
            size="large"
          >
            {isSubmitting ? "Adding FAQ..." : "Add FAQ"}
          </Button>
        </div>
      </form>

      {/* Quick Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          💡 Tips for better FAQs:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Make questions specific and clear</li>
          <li>• Provide comprehensive answers with examples</li>
          <li>• Use consistent terminology</li>
          <li>• Include relevant details users might need</li>
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeForm;
