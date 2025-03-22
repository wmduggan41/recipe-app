"use client"; // Ensures this page is fully client-rendered

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct way to get params in client components
import Image from "next/image";
import Link from "next/link";

// Force Next.js to dynamically render this page
export const dynamic = "force-dynamic";

interface Recipe {
  recipe_id: string;
  name: string;
  meal_type: string;
  label: string;
  time: { value: number; unit: string };
  servings: number;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  nutrition: { name: string; value: string }[];
  image_url: string;
}

export default function RecipePage() {
  const { recipeId } = useParams(); // Correct way to get params in client components
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!recipeId) return; // Ensure recipeId exists before fetching

    async function fetchRecipe() {
      try {
        const response = await fetch(`/recipes/${recipeId}.json`);
        if (!response.ok) throw new Error("Recipe not found");

        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <p className="text-gray-500">Loading recipe...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold">{recipe.name}</h1>
      <Image src={recipe.image_url || "/images/placeholder.jpg"} alt={recipe.name} width={500} height={350} className="rounded-lg mt-4" />
      <p className="text-lg text-gray-700 mt-2">{recipe.label} | {recipe.time.value} {recipe.time.unit} | Serves {recipe.servings}</p>

      {/* Ingredients Section */}
      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="pl-0 mt-2 border-t border-gray-200">
        <li className="flex justify-between font-semibold text-gray-800 border-b py-2">
          <span>Ingredient</span>
          <span className="text-sm text-gray-500">Add to grocery list</span>
        </li>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx} className="flex justify-between items-center border-b py-2">
            <span>{ing.quantity} {ing.name}</span>
            <input
              type="checkbox"
              checked={groceryList.some(item => item.name === ing.name)}
              onChange={(e) => e.target.checked ? addIngredient(ing) : removeIngredient(ing)}
              className="w-5 h-5 accent-green-600"
            />
          </li>
        ))}
      </ul>

      {/* Instructions Section */}
      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <ol className="list-decimal pl-6">
        {recipe.instructions.map((step, idx) => (
          <li key={idx} className="mb-2">{step}</li>
        ))}
      </ol>

{/* Nutritional Facts Section */}
{recipe.nutrition && recipe.nutrition.length > 0 && (
  <div className="mt-6">
    <h2 className="text-2xl font-semibold mb-3">Nutritional Facts</h2>
    <ul className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-4">
      {recipe.nutrition.map((fact, idx) => (
        <li key={idx} className="flex justify-between border-b last:border-b-0 py-2">
          <span className="font-medium text-normal-700">{fact.name}</span>
          <span className="text-normal-900">{fact.value}</span>
        </li>
      ))}
    </ul>
  </div>
)}


      {/* Back Button */}
      <Link href="/recipes" className="mt-6 inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
        ⬅ Back to Recipes
      </Link>
    </div>
  );
}




