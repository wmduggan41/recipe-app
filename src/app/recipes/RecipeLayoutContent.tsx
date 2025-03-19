"use client"; // Ensures this component is fully client-rendered

import { useSearchParams } from "next/navigation";

export default function RecipeLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams(); // This is now inside a client-only file
  const activeCategory = searchParams.get("category") || "Breakfast";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Recipe Collection</h1>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {["Breakfast", "Dinner", "Salads", "Soups", "Desserts", "Drinks"].map((category) => (
          <a
            key={category}
            href={category === "Breakfast" ? "/recipes" : `/recipes?category=${category}`}
            className={`px-4 py-2 rounded-lg transition ${
              activeCategory === category ? "bg-green-700 text-white" : "bg-green-500 text-white hover:bg-green-700"
            }`}
          >
            {category}
          </a>
        ))}
      </div>

      {children}
    </div>
  );
}

