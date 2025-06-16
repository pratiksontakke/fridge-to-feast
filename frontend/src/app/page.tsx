'use client';

import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { RecipeDisplay } from '@/components/RecipeDisplay';

export default function Home() {
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageCapture = async (image: string | File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (typeof image === 'string') {
        // Convert base64 to blob
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append('file', blob, 'image.jpg');
      } else {
        formData.append('file', image);
      }

      // Detect ingredients
      const detectResponse = await fetch('http://localhost:8000/api/detect-ingredients', {
        method: 'POST',
        body: formData,
      });
      const detectData = await detectResponse.json();
      setDetectedIngredients(detectData.detected_ingredients);

      // Generate recipe
      const recipeResponse = await fetch('http://localhost:8000/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: detectData.detected_ingredients,
        }),
      });
      const recipeData = await recipeResponse.json();
      setRecipe(recipeData);
    } catch (error) {
      console.error('Error processing image:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          RecipeSnap 📸🍳
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Take a photo of your fridge and let AI suggest delicious recipes!
        </p>
        
        <ImageUpload onImageCapture={handleImageCapture} />
        
        {(detectedIngredients.length > 0 || isLoading) && (
          <RecipeDisplay
            detectedIngredients={detectedIngredients}
            recipe={recipe}
            isLoading={isLoading}
          />
        )}
      </div>
    </main>
  );
} 