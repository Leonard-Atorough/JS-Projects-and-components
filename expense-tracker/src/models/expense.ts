export interface Expense {
  id: string;
  description: string;
  amountCents: number;
  date: string;
  category?: string;
}
export function createExpenseModel(id: string, fd: FormData): Expense {
  return {
    id: id,
    description: fd.get("desc") as string,
    amountCents: Math.round(parseFloat(fd.get("amount") as string) * 100),
    date: fd.get("date") as string,
    category: fd.get("category") as string,
  };
}
