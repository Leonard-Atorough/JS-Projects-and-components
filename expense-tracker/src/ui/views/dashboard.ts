import { appStore } from "../../state/store";
import { mountAddExpenseForm } from "../components/expenseForm";
import { createExpenseRow } from "../components/expenseRow";

export function initDashboard(root: HTMLElement) {
  const addExpenseForm = document.createElement("div");
  addExpenseForm.id = "addExpenseForm";
  addExpenseForm.className = "container";
  mountAddExpenseForm(addExpenseForm);

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const tr = document.createElement("tr");
  thead.appendChild(tr);
  createSummaryTableHeaders(tr);

  table.append(thead, tbody);
  table.style.padding = "1rem";

  const usubscribe = appStore.subscribe((state) => {
    tbody.innerHTML = "";
    state.expenses.forEach((expense) => tbody.appendChild(createExpenseRow(expense)));
  });

  root.append(addExpenseForm, table);
}
function createSummaryTableHeaders(headElement: HTMLTableRowElement) {
  const headings = ["Description", "Amount", "Date", "Categories"];
  headings.forEach((heading) => {
    const el = document.createElement("th");
    el.textContent = heading;
    headElement.appendChild(el);
  });
}
