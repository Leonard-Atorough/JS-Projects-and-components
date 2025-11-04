import { appStore } from "../../state/store";
import { mountAddExpenseForm } from "../components/expenseForm/expenseForm";
import { createExpenseRow, createExpenseRow2 } from "../components/expenseTable/expenseRow";
import { mountExpenseTable } from "../components/expenseTable/expenseTable";

import styles from "./dashboard.module.css";

export async function initDashboard(): Promise<{
  element: HTMLDivElement;
  cleanup: () => void;
}> {
  const { addExpenseForm, table } = BuildUI();

  const unsubscribe = (await appStore).subscribe((state) => {
    const tableBody = table.tBodies[0];
    tableBody.innerHTML = "";
    state.expenses.forEach((expense, idx) =>
      tableBody.appendChild(createExpenseRow2(expense, idx % 2 !== 0))
    );
  });

  const dashboard = document.createElement("div");
  dashboard.classList.add(styles["dashboard-view"]);
  dashboard.append(addExpenseForm, table);

  return {
    element: dashboard,
    cleanup: async () => {
      unsubscribe();
      (await appStore).dispose();
    },
  };
}

function BuildUI() {
  const addExpenseForm = document.createElement("div");
  addExpenseForm.id = "addExpenseForm";
  addExpenseForm.className = styles["expense-form-container"];
  mountAddExpenseForm(addExpenseForm);

  const table = mountExpenseTable();

  return { addExpenseForm, table };
}
