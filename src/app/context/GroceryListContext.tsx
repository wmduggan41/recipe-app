"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from "@/lib/firebase"; // Use existing app
// import { getAuth } from "firebase/auth";

const db = getDatabase(app); // Reuse the same initialized app

interface Ingredient {
  name: string;
  quantity: string;
}

interface GroceryListContextType {
  groceryList: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredient: Ingredient) => void;
  clearList: () => void;
}

const GroceryListContext = createContext<GroceryListContextType | undefined>(undefined);

export const GroceryListProvider = ({ children }: { children: ReactNode }) => {
  const [groceryList, setGroceryList] = useState<Ingredient[]>([]);

  useEffect(() => {
    const listRef = ref(db, "groceryList/shared"); // Update this soon to use per-user path
    const unsubscribe = onValue(listRef, (snapshot) => {
      const data = snapshot.val();
      setGroceryList(data ? Object.values(data) : []);
    });
    return () => unsubscribe();
  }, []);

  const syncToDB = (list: Ingredient[]) => {
    const listRef = ref(db, "groceryList/shared");
    set(listRef, list);
  };

  const addIngredient = (ingredient: Ingredient) => {
    const updated = [...groceryList, ingredient];
    setGroceryList(updated);
    syncToDB(updated);
  };

  const removeIngredient = (ingredient: Ingredient) => {
    const updated = groceryList.filter((item) => item.name !== ingredient.name);
    setGroceryList(updated);
    syncToDB(updated);
  };

  const clearList = () => {
    setGroceryList([]);
    syncToDB([]);
  };

  return (
    <GroceryListContext.Provider value={{ groceryList, addIngredient, removeIngredient, clearList }}>
      {children}
    </GroceryListContext.Provider>
  );
};

export const useGroceryList = () => {
  const context = useContext(GroceryListContext);
  if (!context) throw new Error("useGroceryList must be used within a GroceryListProvider");
  return context;
};
