import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

// Type Definitions
export type ExpenseCategory =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Bills"
  | "Others";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  name: string;
}

export interface ExpenseStoreState {
  expenses: Expense[];
  categories: ExpenseCategory[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  clearAllExpenses: () => void;
}

const useStore = create<ExpenseStoreState>()(
  persist(
    (set) => ({
      expenses: [],
      categories: ["Food", "Transport", "Shopping", "Bills", "Others"],

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

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        })),

      clearAllExpenses: () => set({ expenses: [] }),
    }),
    {
      name: "expense-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
