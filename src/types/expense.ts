import type { Category, CategorySummary } from "./category";

export interface Expense {
    _id: string;
    name: string;
    amount: number;
    category: Category;
    categoryId: string;
    date: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface CreateExpenseDTO {
    name: string;
    amount: number;
    categoryId: string;
    date: Date | string;
}

export interface ExpenseFilter {
    month: number;
    year: number;
    categoryId?: string;
}

export interface ExpenseSummary {
    totalAmount: number;
    totalExpenses: number;
    expensesByCategory: CategorySummary[];
}