'use client';

import { useState } from 'react';

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  cooking_time: string;
  difficulty: string;
}

interface RecipeDisplayProps {
  detectedIngredients: string[];
  recipe?: Recipe;
  isLoading: boolean;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  detectedIngredients,
  recipe,
  isLoading,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(detectedIngredients);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Detected Ingredients</h2>
        <div className="flex flex-wrap gap-2">
          {detectedIngredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedIngredients.includes(ingredient)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : recipe ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            <span>⏱️ {recipe.cooking_time}</span>
            <span>📊 {recipe.difficulty}</span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside mb-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="mb-1">{ingredient}</li>
            ))}
          </ul>
          
          <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}; 