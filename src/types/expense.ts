export interface Category {
    _id: string;
    name: string;
    color: string;
}

export interface Expense {
    _id: string;
    name: string;
    amount: number;
    category: Category;
    date: string;
}

export interface SummaryData {
    totalAmount: number;
    totalExpenses: number;
    filter?: {
        month: number;
        year: number;
    } | null;
}