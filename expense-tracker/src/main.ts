import "./css/style.css";
import { initDashboard } from "./ui/views/dashboard";

document.addEventListener("DOMContentLoaded", () => {
  const appRoot = document.getElementById("app");
  if (!appRoot) {
    console.error("Missing app root element: #app");
    throw new Error("Missing #app container");
  }
  initDashboard(appRoot);
});
