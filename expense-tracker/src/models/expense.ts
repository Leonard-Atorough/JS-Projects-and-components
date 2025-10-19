export interface Expense {
  id: string;
  description: string;
  amountCents: number;
  date: string;
  category?: string;
}
