import styles from "./expenseTable.module.css";

export const createExpenseTable = (): HTMLTableElement => {
  const table = document.createElement("table");
  table.classList.add(styles["expense-table"]);

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  thead.appendChild(headerRow);
  createSummaryTableHeaders(headerRow);

  const tbody = document.createElement("tbody");
  tbody.classList.add(styles["expense-table-body"]);

  table.append(thead, tbody);

  return table;
};

function createSummaryTableHeaders(headElement: HTMLTableRowElement) {
  const headings = ["DESCRIPTION", "AMOUNT", "DATE", "CATEGORY", "ACTIONS"];
  headings.forEach((heading) => {
    const el = document.createElement("th");
    el.classList.add(`${styles["expense-table-heading"]}`);
    el.textContent = heading;
    headElement.appendChild(el);
  });
}
