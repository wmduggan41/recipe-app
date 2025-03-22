"use client";

import { useGroceryList } from "./context/GroceryListContext";

export default function GroceryListPage() {
  const { groceryList, clearList } = useGroceryList();

  const printGroceryList = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-4xl font-bold mb-6 text-center">🛒 Grocery List</h1>

      {groceryList.length === 0 ? (
        <p className="text-center text-gray-600">Your grocery list is currently empty.</p>
      ) : (
        <>
          <ul className="list-disc pl-6 mb-6">
            {groceryList.map((item, idx) => (
              <li key={idx} className="text-lg">
                {item.quantity} {item.name}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={printGroceryList}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              🖨️ Print List
            </button>
            <button
              onClick={clearList}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑️ Clear List
            </button>
            {/* Placeholder for Share */}
            <button
              onClick={() => alert("Sharing coming soon!")}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              📤 Share
            </button>
          </div>
        </>
      )}
    </div>
  );
}
