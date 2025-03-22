"use client"; // Ensures the homepage is fully client-rendered

import Link from "next/link";

// Force Next.js to dynamically render this page
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-lg font-bold">Welcome to the Recipe App</h1>
      <p className="text-sm mt-4 text-normal">Browse and enjoy delicious recipes. Coming soon: Add ingredients to your grocery list.</p>
      <Link href="/recipes" className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-500">
        View Recipes
      </Link>
      <Link href="/grocery-list">
        <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-500">
          View Grocery List
        </button>
      </Link>
    </div>
  );
}



