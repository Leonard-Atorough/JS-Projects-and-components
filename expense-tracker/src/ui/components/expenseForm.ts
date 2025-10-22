import { createExpenseModel, type Expense } from "../../models/expense";
import { appStore } from "../../state/store";

import styles from "./expenseForm.module.css";

export const mountAddExpenseForm = (container: HTMLElement): Promise<void> => {
  const formTitle = document.createElement("h2");
  formTitle.textContent = "Add Expense";
  const form = createForm();
  form.classList.add(`${styles["add-form"]}`);

  container.append(formTitle, form);

  attachEditHandler(form);
  return attachFormHandler(form);
};

function attachFormHandler(form: HTMLFormElement): Promise<void> {
  return new Promise<void>((resolve) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const id = form.id.length > 0 ? form.id : crypto.randomUUID();
      const fd = new FormData(form);
      const newExpense: Expense = createExpenseModel(id, fd);

      const existingExpenseIndex = (await appStore)
        .getState()
        .expenses.findIndex((x) => x.id === newExpense.id);
      if (existingExpenseIndex !== -1) {
        // Edit existing expense
        await editExpense(existingExpenseIndex, newExpense);
      } else {
        // Add new expense
        await addExpense(newExpense);
      }
      form.reset();
      form.id = "";
      resolve();
    });
  });
}

async function addExpense(newExpense: Expense) {
  (await appStore).setState((prev) => ({
    ...prev,
    expenses: [...prev.expenses, newExpense],
  }));
}

async function editExpense(existingExpenseIndex: number, newExpense: Expense) {
  (await appStore).setState((prev) => {
    const updatedExpenses = [...prev.expenses];
    updatedExpenses[existingExpenseIndex] = newExpense;
    return {
      ...prev,
      expenses: updatedExpenses,
    };
  });
}

function attachEditHandler(form: HTMLFormElement): void {
  document.addEventListener("edit-expense", async (e: Event) => {
    const CustomEvent = e as CustomEvent;
    const expenseid = CustomEvent.detail as string;
    const expense = (await appStore).getState().expenses.find((x) => x.id === expenseid);
    if (!expense) return;
    form.reset();
    form.id = expense.id;
    (form.elements.namedItem("desc") as HTMLInputElement).value = expense.description;
    (form.elements.namedItem("amount") as HTMLInputElement).value = (
      expense.amountCents / 100
    ).toFixed(2);
    (form.elements.namedItem("date") as HTMLInputElement).value = expense.date;
    (form.elements.namedItem("category") as HTMLSelectElement).value = expense.category ?? "";
  });
}

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
