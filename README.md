## Current App Architecture & Planning

```
/public/                    
├── images/
│   └── placeholder.jpg          → Placeholder image for all recipes (will be replaced with actual images)
├── recipes/                    ← Static content (currently file-based recipes)
|   └── recipeList.json          → Master JSON file listing each recipe_id
│   └── "individual".json        → Multiple JSON files for each recipe
│
/src/app
├── context/
│   └── GroceryListContext.tsx   → Global state & Firebase sync
├── grocery-list/
│   └── page.tsx                 → Grocery list display with print/clear
├── recipes/
│   ├── [recipeId]/              → Single recipe page with ingredients
│   │   └── page.tsx             → Gallery of recipes (dynamically loaded)
│   ├── components/              
│   │   └── RecipeGalleryContext.tsx → Displays grid of recipes
│   │   └── RecipeLayoutProvider.tsx → Wrapper with filter
│   ├── layout.tsx               
│   └── page.tsx
├── styles/
│   └── globals.css              → Style centralization
├── layout.tsx                   → Root layout with header/footer
└── page.tsx                     → Homepage (welcome screen)
/src/lib
└── firebase.ts                  → Firebase setup
```


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
