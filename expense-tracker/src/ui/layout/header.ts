import styles from "./header.module.css";

export function initHeader(root: HTMLElement) {
  const render = () => {
    const header = document.createElement("header");
    header.classList.add(`${styles["header-banner"]}`);

    const title = document.createElement("h1");
    title.textContent = "Expenses Dashboard";
    title.classList.add(styles.title);

    header.append(title);
    const rootParent = root.parentNode;

    rootParent?.insertBefore(header, root);
  };

  render();
}
