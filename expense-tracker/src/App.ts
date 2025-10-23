import "./css/style.css";
import { initAside } from "./ui/layout/aside";
import { initHeader } from "./ui/layout/header";
import { initMain } from "./ui/layout/main";
import { initDashboard } from "./ui/views/dashboard";

async function initApp(container: HTMLElement) {
  initHeader(container);
  initAside(container);
  const { element: dashboard, cleanup } = await initDashboard();
  initMain(container, dashboard);
  return cleanup;
}

const run = async () => {
  document.addEventListener("DOMContentLoaded", async () => {
    const appRoot = document.getElementById("app");
    if (!appRoot) {
      console.error("Missing app root element: #app");
      throw new Error("Missing #app container");
    }

    const cleanup = await initApp(appRoot);

    // Optionally handle cleanup on unload
    window.addEventListener("beforeunload", () => {
      cleanup();
    });
  });
};
run();
