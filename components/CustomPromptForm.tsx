
import React from 'react';
import { sanitizePrompt } from '../utils/sanitizePrompt';

interface CustomPromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (sanitizedPrompt: string) => void; // pass sanitized
  isLoading: boolean;
}

const CustomPromptForm: React.FC<CustomPromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      const safePrompt = sanitizePrompt(prompt);
      onSubmit(safePrompt);   // 🔥 send safe prompt instead
    }
  };
  
  return (
    <div className="mt-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">Describe your image</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A realistic image of a soccer player kicking a ball towards the goal net in a stadium filled with cheering fans."
          className="flex-grow px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="px-8 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? 'Generating...' : 'Generate Custom Image'}
        </button>
      </form>
    </div>
  );
};

export default CustomPromptForm;