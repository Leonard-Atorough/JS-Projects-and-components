import type { Expense } from "../../models/expense";
import { appStore } from "../../state/store";

import styles from "./expenseRow.module.css";

export const createExpenseRow = (
  expense: Expense,
  isAlternative?: boolean
): HTMLTableRowElement => {
  const tableRow = document.createElement("tr");
  tableRow.id = expense.id;
  tableRow.classList.add(styles["expense-table-row"]);
  if (isAlternative) tableRow.classList.add(`${styles["-alternate"]}`);

  const fragement = new DocumentFragment();

  const desc = createTableCell({ content: expense.description });
  const amnt = createTableCell({ content: (expense.amountCents / 100).toFixed(2).toString() });
  const date = createTableCell({ content: expense.date });
  const category = createTableCell({ content: expense.category ?? "(Empty)" });
  const actions = createTableActionsRow();

  fragement.append(desc, amnt, date, category, actions);
  tableRow.appendChild(fragement);

  attachClickHandlers(tableRow);

  return tableRow;
};

const createTableCell = (options: { content: string }): HTMLTableCellElement => {
  const cell = document.createElement("td");
  cell.textContent = options.content;
  cell.classList.add(styles.cell);
  return cell;
};

const createTableActionsRow = (): HTMLTableCellElement => {
  const cell = document.createElement("td");
  cell.classList.add(styles.cell);

  addButton(cell, { name: "edit", icon: "fa-solid fa-pencil" });
  addButton(cell, { name: "delete", icon: "fa-solid fa-trash" });

  return cell;
};

const addButton = (
  parent: HTMLTableCellElement,
  options: {
    name: string;
    icon: string;
  }
): void => {
  const button = document.createElement("button");
  button.id = options.name;
  button.classList.add(styles.button);
  const icon = document.createElement("i");
  icon.className = options.icon;
  button.appendChild(icon);
  parent.appendChild(button);
};

const attachClickHandlers = (row: HTMLTableRowElement) => {
  row.addEventListener("click", async (e) => {
    e.preventDefault();
    if ((e.target as HTMLElement).closest("#delete")) {
      console.log((e.target as HTMLElement).closest("#delete"));
      (await appStore).setState((prev) => ({
        ...prev,
        expenses: prev.expenses.filter((x) => x.id !== row.id),
      }));
    }
  });
};
