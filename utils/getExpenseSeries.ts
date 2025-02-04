import { Expense, ExpenseCategory, ExpenseCategoryEnum } from "@/state/store";

interface SeriesData {
  value: number;
  label: string;
  color: string;
}

export const getExpenseSeries = (
  expenses: Expense[],
  categories: ExpenseCategory[]
): SeriesData[] => {
  if (expenses.length === 0) return [];

  // Group expenses by category and sum their amounts
  const categoryTotals = expenses.reduce<Record<ExpenseCategoryEnum, number>>(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<ExpenseCategoryEnum, number>
  );

  return categories
    .filter((category) => categoryTotals[category.name])
    .map((category) => ({
      value: categoryTotals[category.name],
      label: category.name,
      color: category.color,
    }));
};
