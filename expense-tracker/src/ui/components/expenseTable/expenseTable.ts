import styles from "./expenseTable.module.css";

export const mountExpenseTable = (): HTMLTableElement => {
  const table = document.createElement("table");
  table.classList.add(styles["expense-table"]);

  const headings = ["DESCRIPTION", "AMOUNT", "DATE", "CATEGORY", "ACTIONS"];

  table.innerHTML = `
    <thead>
      <tr>
        ${headings.map((h) => `<th class=${styles["expense-table-heading"]}>${h}</th>`).join("")}
      </tr> 
    </thead>
    <tbody class=${["expense-table-body"]}></tbody>
  `;

  return table;
};

// function createSummaryTableHeaders(headElement: HTMLTableRowElement) {
//   const headings = ["DESCRIPTION", "AMOUNT", "DATE", "CATEGORY", "ACTIONS"];
//   headings.forEach((heading) => {
//     const el = document.createElement("th");
//     el.classList.add(`${styles["expense-table-heading"]}`);
//     el.textContent = heading;
//     headElement.appendChild(el);
//   });
// }
