export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Recipe App</h1>
      <p className="text-lg mt-4 text-gray-600">Browse and enjoy delicious recipes.</p>
      <a href="/recipes" className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800">
        View Recipes
      </a>
    </div>
  );
}

