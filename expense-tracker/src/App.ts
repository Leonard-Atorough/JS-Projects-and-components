import "./css/style.css";
import { initAside } from "./ui/layout/aside";
import { initHeader } from "./ui/layout/header";
import { initMain } from "./ui/layout/main";
import { initDashboard } from "./ui/views/dashboard";

document.addEventListener("DOMContentLoaded", async () => {
  const appRoot = document.getElementById("app");
  if (!appRoot) {
    console.error("Missing app root element: #app");
    throw new Error("Missing #app container");
  }

  initHeader(appRoot);
  initAside(appRoot);
  const dashboardView = initDashboard();
  initMain(appRoot, await dashboardView);
});
