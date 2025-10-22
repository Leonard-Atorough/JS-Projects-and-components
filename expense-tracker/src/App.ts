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
  const { element: dashboard, cleanup } = await initDashboard();
  initMain(appRoot, dashboard);
});

// Note: No need to explicitly handle unmounting in this simple app,
// but if needed, you can call cleanup() from initDashboard when unmounting the dashboard view.
// for example:
// document.addEventListener("beforeunload", () => {
//   // cleanup();
// });
