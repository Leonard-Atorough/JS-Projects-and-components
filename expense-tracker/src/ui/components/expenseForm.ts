import type { Expense } from "../../models/expense";
import { appStore } from "../../state/store";

import styles from "./expenseForm.module.css";

export const mountAddExpenseForm = (container: HTMLElement): void => {
  const form = createForm();
  form.classList.add(`${styles["add-form"]}`);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description: fd.get("desc") as string,
      amountCents: Math.round(parseFloat(fd.get("amount") as string) * 100),
      date: fd.get("date") as string,
    };

    appStore.setState((prev) => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));

    form.reset();
  });

  container.appendChild(form);
};

function createForm(): HTMLFormElement {
  const form = document.createElement("form");
  let fragement = new DocumentFragment();

  const expenseDescription = document.createElement("input");
  expenseDescription.classList.add(`${styles.input}`);
  expenseDescription.name = "desc";
  expenseDescription.placeholder = "Description...";
  expenseDescription.required = true;

  const expenseAmount = document.createElement("input");
  expenseAmount.classList.add(`${styles.input}`);
  expenseAmount.name = "amount";
  expenseAmount.type = "number";
  expenseAmount.step = "0.01";
  expenseAmount.required = true;

  const expenseDate = document.createElement("input");
  expenseDate.classList.add(`${styles.input}`);
  expenseDate.name = "date";
  expenseDate.type = "date";
  expenseDate.required = true;

  const button = document.createElement("button");
  button.classList.add(`${styles.button}`);
  button.type = "submit";
  button.textContent = "Add";

  fragement.append(expenseDescription, expenseAmount, expenseDate, button);
  form.appendChild(fragement);

  return form;
}
