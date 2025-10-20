import "./css/style.css";
import { initHeader } from "./ui/layout/header";
import { initDashboard } from "./ui/views/dashboard";

document.addEventListener("DOMContentLoaded", () => {
  const appRoot = document.getElementById("app");
  if (!appRoot) {
    console.error("Missing app root element: #app");
    throw new Error("Missing #app container");
  }

  initHeader(appRoot);
  initDashboard(appRoot);
});
