"use client";

import dynamic from "next/dynamic";

// 🚀 Force Next.js to dynamically load this component, avoiding SSR issues
const RecipeLayoutContent = dynamic(() => import("./RecipeLayoutContent"), { ssr: false });

export default function RecipeLayout({ children }: { children: React.ReactNode }) {
  return <RecipeLayoutContent>{children}</RecipeLayoutContent>;
}


