"use client";

import { useSearchParams } from "next/navigation";

export default function RecipeLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Recipe Collection</h1>

      {/* Responsive Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        {["All", "Breakfast", "Dinner", "Salads", "Soups", "Desserts", "Drinks"].map((category) => (
          <a
            key={category}
            href={category === "All" ? "/recipes" : `/recipes?category=${category}`}
            className={`px-3 py-2 rounded-lg text-sm sm:text-base transition ${
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


