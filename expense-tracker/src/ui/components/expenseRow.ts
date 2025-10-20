import type { Expense } from "../../models/expense";

import styles from "./expenseRow.module.css";

export const createExpenseRow = (
  expense: Expense,
  isAlternative?: boolean
): HTMLTableRowElement => {
  const tableRow = document.createElement("tr");
  tableRow.classList.add(`${styles["expense-table-row"]}`);
  if (isAlternative) tableRow.classList.add(`${styles["-alternate"]}`);

  const fragement = new DocumentFragment();

  const desc = document.createElement("td");
  desc.textContent = expense.description;
  desc.classList.add(styles.row);

  const amnt = document.createElement("td");
  amnt.textContent = (expense.amountCents / 100).toFixed(2).toString();
  amnt.classList.add(styles.row);

  const date = document.createElement("td");
  date.textContent = expense.date;
  date.classList.add(styles.row);

  const category = document.createElement("td");
  category.textContent = expense.category ?? "(Empty)";
  category.classList.add(styles.row);

  fragement.append(desc, amnt, date, category);
  tableRow.appendChild(fragement);

  return tableRow;

  //   const elements: string[] = Array.from(Object.values(expense));
  //   elements.forEach((element) => {
  //     const td = document.createElement("td");
  //     td.textContent = element;
  //   });
};
