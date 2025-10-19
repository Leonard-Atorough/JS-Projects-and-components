import { appStore } from "../../state/store";
import { mountAddExpenseForm } from "../components/expenseForm";
import { createExpenseRow } from "../components/expenseRow";

export function initDashboard(root: HTMLElement) {
  const addExpenseForm = document.createElement("div");
  addExpenseForm.className = "add-form";
  mountAddExpenseForm(addExpenseForm);

  const tbody = document.createElement("tbody");
  const table = document.createElement("table");
  table.appendChild(tbody);

  const usubscribe = appStore.subscribe((state) => {
    tbody.innerHTML = "";
    state.expenses.forEach((expense) => tbody.appendChild(createExpenseRow(expense)));
  });

  root.append(addExpenseForm, table);
}
