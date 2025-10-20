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
      category: fd.get("category") as string,
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

  const descInput = createInput({
    name: "desc",
    placeholder: "Description...",
    required: true,
  });

  const amountInput = createInput({
    name: "amount",
    type: "number",
    step: "0.01",
    required: true,
  });

  const dateInput = createInput({ name: "date", type: "date", required: true });

  const categorySelect = createCategorySelect();

  const button = document.createElement("button");
  button.classList.add(`${styles.button}`);
  button.type = "submit";
  button.textContent = "Add";

  const fragement = new DocumentFragment();
  fragement.append(descInput, amountInput, dateInput, categorySelect, button);
  form.appendChild(fragement);

  return form;
}

const createInput = (options: {
  name: string;
  type?: string;
  placeholder?: string;
  step?: string;
  required?: boolean;
}): HTMLInputElement => {
  const input = document.createElement("input");
  input.classList.add(`${styles.input}`);
  input.name = options.name;
  input.type = options.type ?? "text";
  if (options.placeholder) input.placeholder = options.placeholder;
  if (options.step) input.step = options.step;
  if (options.required) input.required = options.required;
  return input;
};

function createCategorySelect(): HTMLSelectElement {
  const select = document.createElement("select");
  select.classList.add(styles.input);
  select.name = "category";

  const DEFAULT_CATEGORY_MAP = [
    "Food & Drink",
    "Transportation",
    "Housing",
    "Health & Wellness",
    "Entertainment",
    "Travel",
    "Education",
    "Personal Care",
    "Pets",
    "Savings & Investments",
    "Miscellaneous",
    "Other",
  ];

  for (const category of DEFAULT_CATEGORY_MAP) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  }
  return select;
}
