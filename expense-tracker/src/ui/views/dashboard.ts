import { appStore } from "../../state/store";
import { mountAddExpenseForm } from "../components/expenseForm";
import { createExpenseRow } from "../components/expenseRow";

import styles from "./dashboard.module.css";

export async function initDashboard(): Promise<HTMLDivElement> {
  const { tbody, addExpenseForm, table } = BuildUI();

  const usubscribe = (await appStore).subscribe((state) => {
    tbody.innerHTML = "";
    state.expenses.forEach((expense, idx) =>
      tbody.appendChild(createExpenseRow(expense, idx % 2 !== 0))
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
  addExpenseForm.className = "container";
  mountAddExpenseForm(addExpenseForm);

  const table = document.createElement("table");
  table.classList.add(styles["expense-table"]);

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  thead.appendChild(headerRow);
  createSummaryTableHeaders(headerRow);

  const tbody = document.createElement("tbody");

  table.append(thead, tbody);
  return { tbody, addExpenseForm, table };
}

function createSummaryTableHeaders(headElement: HTMLTableRowElement) {
  const headings = ["DESCRIPTION", "AMOUNT", "DATE", "CATEGORY"];
  headings.forEach((heading) => {
    const el = document.createElement("th");
    el.classList.add(`${styles["expense-table-heading"]}`);
    el.textContent = heading;
    headElement.appendChild(el);
  });
}
