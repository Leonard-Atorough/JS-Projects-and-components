import styles from "./main.module.css";

export function initMain(root: HTMLElement, view: HTMLElement) {
  const main = render(root);
  main.appendChild(view);
}

const render = (root: HTMLElement): HTMLElement => {
  const main = document.createElement("div");
  main.classList.add(styles["main-content"]);
  root.appendChild(main);

  return main;
};
