"use client"; // Ensures this page is fully client-rendered

import dynamic from "next/dynamic";

// 🚀 Dynamically import RecipeGalleryContent to prevent SSR issues
const RecipeGalleryContent = dynamic(() => import("./RecipeGalleryContent"), { ssr: false });

export default function RecipeGallery() {
  return <RecipeGalleryContent />;
}
