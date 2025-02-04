import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

// Type Definitions
export type ExpenseCategoryEnum =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Bills"
  | "Others";

export type ExpenseCategory = {
  name: ExpenseCategoryEnum;
  icon: string;
  color: string;
};

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory["name"];
  date: string;
  name: string;
}

export interface ExpenseStoreState {
  user: string;
  setUser: (user: string) => void;
  expenses: Expense[];
  categories: ExpenseCategory[];
  addExpense: (expense: Omit<Expense, "id">) => void;
}

const useStore = create<ExpenseStoreState>()(
  persist(
    (set) => ({
      user: "",
      setUser: (user: string) => set((state) => ({ ...state, user })),
      expenses: [],
      categories: [
        { name: "Food", color: "goldenrod", icon: "restaurant-outline" },
        { name: "Transport", color: "dodgerblue", icon: "car-sport-outline" },
        { name: "Shopping", color: "green", icon: "bag-handle-outline" },
        { name: "Bills", color: "red", icon: "card-outline" },
        { name: "Others", color: "gray", icon: "ellipsis-horizontal-outline" },
      ],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            ...state.expenses,
            {
              ...expense,
              id: Math.random().toString(36).substring(2, 9),
            },
          ],
        })),
    }),
    {
      name: "expense-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
