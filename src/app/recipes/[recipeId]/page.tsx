"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

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
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`/recipes/${recipeId}.json`);
        if (!response.ok) throw new Error("Recipe not found");

        setRecipe(await response.json());
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
      <Image src={recipe.image_url || "/images/placeholder.jpg"} width={500} height={350} className="rounded-lg mt-4" />
      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc pl-6">{recipe.ingredients.map((ing, idx) => <li key={idx}>{ing.quantity} {ing.name}</li>)}</ul>
    </div>
  );
}


