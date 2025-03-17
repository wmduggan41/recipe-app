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
      <ul className="list-disc pl-6">
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing.quantity} {ing.name}</li>
        ))}
      </ul>

      {/* Instructions Section */}
      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <ol className="list-decimal pl-6">
        {recipe.instructions.map((step, idx) => (
          <li key={idx} className="mb-2">{step}</li>
        ))}
      </ol>

      {/* Back Button */}
      <Link href="/recipes" className="mt-6 inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
        ⬅ Back to Recipes
      </Link>
    </div>
  );
}


