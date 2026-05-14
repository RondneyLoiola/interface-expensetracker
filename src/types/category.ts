export interface Category {
    _id: string;
    name: string;
    color: string;
}

export interface CategorySummary {
    categoryId: string;
    categoryName: string;
    categoryColor: string;
    amount: number;
    percentage: number;
    [key: string]: string | number;
}