import type { ChartData } from "../../../models/chartData";
import Chart from "chart.js/auto";

export const mountPieChart = (root: HTMLDivElement, data: [ChartData]): HTMLDivElement => {
  const container = document.createElement("div");
  const chartId = "pie-chart";

  container.innerHTML = `
        <div>
            <canvas id="${chartId}" style="width:100%; max-width:600px"></canvas>
        </div>
        <div></div>
    `;

  root.appendChild(container);
  renderChart(chartId, data);
  return container;
};
function renderChart(chartId: string, data: [ChartData]) {
  const ctx = document.getElementById(chartId)! as HTMLCanvasElement;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.map((expense) => expense.title),
      datasets: [
        {
          backgroundColor: data.map((expense) => expense.color),
          data: data.map((expense) => expense.value),
        },
      ],
    },
  });
}
