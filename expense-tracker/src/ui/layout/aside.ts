import styles from "./aside.module.css";

export function initAside(root: HTMLElement) {
  render(root);
}
const render = (root: HTMLElement) => {
  const aside = document.createElement("aside");
  aside.classList.add(styles["main-sidebar"]);
  aside.id = "main-sidebar";
  root.appendChild(aside);
};
