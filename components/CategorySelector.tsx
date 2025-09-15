import React from 'react';
import { SportCategory } from '../types';

interface CategorySelectorProps {
  categories: SportCategory[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">Your Favorite Sports</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800"
          >
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
              <h3 className="text-xl font-bold text-white text-center">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;