"use client";

import { useGroceryList } from "@/app/context/GroceryListContext";

export default function GroceryListPage() {
  const { groceryList, removeIngredient, clearList } = useGroceryList();

  const printGroceryList = () => {
    window.print();
  };

  const sortedList = [...groceryList].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-4xl font-bold mb-6 text-center">🛒 Grocery List</h1>

      {sortedList.length === 0 ? (
        <p className="text-center text-gray-600">Your list is empty.</p>
      ) : (
        <>
          <ul className="divide-y border rounded-lg mb-6">
            {sortedList.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center p-4">
                <span className="text-black">{item.quantity} {item.name}</span>
                <button
                  onClick={() => removeIngredient(item)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={printGroceryList}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              🖨️ Print List
            </button>

            <button
              onClick={clearList}
              className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              🗑️ Clear All
            </button>

            <button
              onClick={() => alert("Sharing coming soon!")}
              className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              📤 Share
            </button>
          </div>
        </>
      )}
    </div>
  );
}
