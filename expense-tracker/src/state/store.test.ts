import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStore } from "./store";
import type { AppState } from "./types";

let store: ReturnType<typeof createStore>;

function SetUpStore(): ReturnType<typeof createStore> {
  const testState: AppState = {
    expenses: [
      {
        id: "1",
        description: "Coffee",
        amountCents: 450,
        date: "2025-10-01",
      },
    ],
    isLoading: false,
  };
  return createStore(testState);
}

beforeEach(() => {
  store = SetUpStore();
});

describe("getState", () => {
  it("returns a shallow copy of the initial app state", async () => {
    const snapshot = (await store).getState();

    expect(snapshot).toEqual({
      expenses: [
        {
          id: "1",
          description: "Coffee",
          amountCents: 450,
          date: "2025-10-01",
        },
      ],
      isLoading: false,
      mode: "create",
      selectedExpenseId: null,
    });

    snapshot.isLoading = true;
    expect((await store).getState().isLoading).toBe(false);
  });
});

describe("setState", () => {
  it("updates and mutates the app state", async () => {
    const newExpense = {
      id: "3",
      description: "Chocolate bar",
      amountCents: 500,
      date: "2025-06-21",
    };

    (await store).setState((prev) => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));

    expect((await store).getState().expenses).contains(newExpense);
  });
});

describe("subscribe", () => {
  it("adds a callback function to an subscriber pool that is called when state changes", async () => {
    const calls: AppState[] = [];
    const unsub = (await store).subscribe((state) => calls.push(state));

    expect(calls).toHaveLength(1);
    expect(calls[0].isLoading).toBe(false);

    (await store).setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    expect(calls).toHaveLength(2);
    expect(calls[1].isLoading).toBe(true);

    unsub();
  });
});
