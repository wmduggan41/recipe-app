"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Recipe {
  recipe_id: string;
  name: string;
  add_to_grocery_list: boolean;
  meal_type: string;
  label: string;
  time: { value: number; unit: string };
  servings: number;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  image_url: string;
  tags: string[];
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("/recipes/chicken_alfredo_pasta.json");
        if (!response.ok) throw new Error("Failed to fetch recipe");
        const data = await response.json();
        setRecipes([data]); // Store recipe as an array for future expansion
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-3xl">
        <h1 className="text-3xl font-bold">Recipe List</h1>
        
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.recipe_id} className="border border-gray-300 rounded-lg p-6 bg-white shadow-md w-full">
              <h2 className="text-2xl font-semibold text-green-700">{recipe.name}</h2>
              <Image
                src={recipe.image_url || "/images/placeholder.jpg"}
                alt={recipe.name} 
                width={400} 
                height={250} 
                className="rounded-lg mt-4"
              />
              <p className="text-lg font-semibold text-green-700 mt-2"><strong>Meal Type:</strong> {recipe.meal_type}</p>
              <p className="text-black"><strong>Label:</strong> {recipe.label}</p>
              <p className="text-black"><strong>Time:</strong> {recipe.time.value} {recipe.time.unit}</p>
              <p className="text-black"><strong>Servings:</strong> {recipe.servings}</p>
              
              <h3 className="text-lg font-semibold text-green-700 mt-4">Ingredients</h3>
              <ul className="list-disc list-inside text-black">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing.quantity} {ing.name}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold text-green-700 mt-4">Instructions</h3>
              <ol className="list-decimal list-inside text-black">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading recipes...</p>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-10">
        <a className="text-blue-500 hover:underline" href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Learn Next.js
        </a>
        <a className="text-blue-500 hover:underline" href="https://vercel.com/templates?framework=next.js" target="_blank" rel="noopener noreferrer">
          More Examples
        </a>
      </footer>
    </div>
  );
}
