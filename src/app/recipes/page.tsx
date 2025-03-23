"use client"; // Ensures this page is fully client-rendered

import * as NextDynamic from "next/dynamic"; // Fix dynamic import

// Dynamically import RecipeGalleryContent to prevent SSR issues
const RecipeGalleryContent = NextDynamic.default(() => import("./components/RecipeGalleryContent"), { ssr: false });

export const dynamic = "force-dynamic"; // Ensures proper dynamic loading in Next.js

export default function RecipeGallery() {
  return <RecipeGalleryContent />;
}