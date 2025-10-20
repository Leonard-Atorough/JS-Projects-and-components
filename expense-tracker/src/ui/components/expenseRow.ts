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

  const desc = createTableRow({ content: expense.description });
  const amnt = createTableRow({ content: (expense.amountCents / 100).toFixed(2).toString() });
  const date = createTableRow({ content: expense.date });
  const category = createTableRow({ content: expense.category ?? "(Empty)" });

  fragement.append(desc, amnt, date, category);
  tableRow.appendChild(fragement);

  return tableRow;
};

const createTableRow = (options: { content: string }): HTMLTableCellElement => {
  const cell = document.createElement("td");
  cell.textContent = options.content;
  cell.classList.add(styles.row);
  return cell;
};
