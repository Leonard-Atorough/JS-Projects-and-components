import { appStore } from "../../state/store";
import { mountAddExpenseForm } from "../components/expenseForm/expenseForm";
import { createExpenseRow } from "../components/expenseTable/expenseRow";
import { createExpenseTable } from "../components/expenseTable/expenseTable";

import styles from "./dashboard.module.css";

export async function initDashboard(): Promise<HTMLDivElement> {
  const { addExpenseForm, table } = BuildUI();

  const unsubscribe = (await appStore).subscribe((state) => {
    const tableBody = table.tBodies[0];
    tableBody.innerHTML = "";
    state.expenses.forEach((expense, idx) =>
      tableBody.appendChild(createExpenseRow(expense, idx % 2 !== 0))
    );
  });

  const dashboard = document.createElement("div");
  dashboard.classList.add(styles["dashboard-view"]);
  dashboard.append(addExpenseForm, table);

  return dashboard;
}

function BuildUI() {
  const addExpenseForm = document.createElement("div");
  addExpenseForm.id = "addExpenseForm";
  addExpenseForm.className = styles["expense-form-container"];
  mountAddExpenseForm(addExpenseForm);

  const table = createExpenseTable();

  return { addExpenseForm, table };
}
