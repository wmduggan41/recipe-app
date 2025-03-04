"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface Recipe {
  recipe_id: string;
  name: string;
  meal_type: string;
  label: string;
  time: { value: number; unit: string };
  image_url: string;
}

export default function RecipeGallery() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("/recipes/recipeList.json");
        if (!response.ok) throw new Error("Failed to fetch recipe list");

        const { recipes: recipeFiles }: { recipes: string[] } = await response.json();

        const loadedRecipes = await Promise.all(
          recipeFiles.map(async (file: string) => {
            const recipeResponse = await fetch(`/recipes/${file}`);
            if (!recipeResponse.ok) throw new Error(`Failed to fetch ${file}`);
            return recipeResponse.json();
          })
        );

        setRecipes(category ? loadedRecipes.filter((r) => r.meal_type === category) : loadedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    fetchRecipes();
  }, [category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {recipes.map((recipe) => (
        <a key={recipe.recipe_id} href={`/recipes/${recipe.recipe_id}`} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <Image src={recipe.image_url || "/images/placeholder.jpg"} alt={recipe.name} width={300} height={200} className="rounded-lg" />
          <h2 className="text-xl font-semibold mt-2">{recipe.name}</h2>
          <p className="text-sm text-gray-600">{recipe.label} | {recipe.time.value} {recipe.time.unit}</p>
        </a>
      ))}
    </div>
  );
}

