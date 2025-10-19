import type { Expense } from "../../models/expense";

export const createExpenseRow = (expense: Expense): HTMLTableRowElement => {
  const tr = document.createElement("tr");
  const fragement = new DocumentFragment();

  const desc = document.createElement("td");
  desc.textContent = expense.description;

  const amnt = document.createElement("td");
  amnt.textContent = (expense.amountCents / 100).toFixed(2).toString();

  const date = document.createElement("td");
  date.textContent = expense.date;

  fragement.append(desc, amnt, date);
  tr.appendChild(fragement);

  return tr;

  //   const elements: string[] = Array.from(Object.values(expense));
  //   elements.forEach((element) => {
  //     const td = document.createElement("td");
  //     td.textContent = element;
  //   });
};
