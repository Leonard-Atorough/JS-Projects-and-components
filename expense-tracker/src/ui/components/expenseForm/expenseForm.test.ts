import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { mountAddExpenseForm } from "./expenseForm";

let container: HTMLElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
});

describe("When mountAddExpenseForm is called", () => {
  it("mounts to a containing element successfully", () => {
    mountAddExpenseForm(container);

    const form = container.querySelector("form");
    expect(form).not.toBeNull();

    const inputs = container.querySelectorAll("input");
    expect(inputs).toHaveLength(3);

    const [desc, amount, date] = Array.from(inputs);

    expect(desc.getAttribute("name")).toBe("desc");
    expect(desc.getAttribute("placeholder")).toBe("Description...");
    expect(desc.hasAttribute("required")).toBeTruthy();

    expect(amount.getAttribute("name")).toBe("amount");
    expect(amount.getAttribute("type")).toBe("number");
    expect(amount.hasAttribute("required")).toBeTruthy();

    expect(date.getAttribute("name")).toBe("date");
    expect(date.getAttribute("type")).toBe("date");
    expect(date.hasAttribute("required")).toBeTruthy();

    const button = form?.querySelector('button[type="submit"]');
    expect(button).not.toBeNull();
    expect(button?.textContent).toContain("Add");
  });
});

describe("when the add button is clicked on mountAddExpenseForm", () => {
  it("adds a new expense to the store when it is submitted", async () => {
    const mountPromise = mountAddExpenseForm(container);

    const form = container.querySelector("form");
    const [desc, amount, date] = Array.from(form!.querySelectorAll("input"));

    desc.value = "Oreos";
    amount.value = "50.00";
    date.value = "2025-10-19";

    form?.dispatchEvent(new Event("submit", { cancelable: true }));

    await mountPromise;

    expect(desc.value).toBe("");
    expect(amount.value).toBe("");
    expect(date.value).toBe("");
  });

  it("clears the input field after a successful submission", async () => {
    const mountPromise = mountAddExpenseForm(container);

    const form = container.querySelector("form");
    const [desc, amount, date] = Array.from(form!.querySelectorAll("input"));

    desc.value = "Oreos";
    amount.value = "50.00";
    date.value = "2025-10-19";

    form?.dispatchEvent(new Event("submit"));

    await mountPromise;

    expect(desc.value).toBe("");
    expect(amount.value).toBe("");
    expect(date.value).toBe("");
  });
});
