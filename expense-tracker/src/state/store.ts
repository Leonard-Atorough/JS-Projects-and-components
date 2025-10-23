import { loadExpenseAsync } from "../services/storage";
import { createBatchExpenseSaver } from "./batch";

import type { AppState } from "./types";

export async function createStore(InitialPartial: Partial<AppState> = {}) {
  let state: AppState = {
    expenses: await loadExpenseAsync(),
    isLoading: false,
    mode: "create",
    selectedExpenseId: null,
    ...InitialPartial,
  };
  const subscribers = new Set<(s: AppState) => void>();
  const saver = createBatchExpenseSaver({ expenses: state.expenses });

  const getState = (): AppState => ({ ...state });

  const setState = (updater: (prev: AppState) => AppState): void => {
    const newState = updater(state);
    if (newState.expenses !== state.expenses) {
      saver.notify(newState.expenses);
    }
    state = newState;
    // Notify listeners
    emit();
  };

  const subscribe = (fn: (state: AppState) => void): (() => void) => {
    subscribers.add(fn);
    fn(getState());

    return () => subscribers.delete(fn);
  };

  const emit = () => {
    const snapshot = getState();

    for (const listener of subscribers) {
      try {
        listener(snapshot);
      } catch (e) {
        console.error("State listener threw", e);
      }
    }
  };
  const dispose = () => {
    saver.flush();
    saver.dispose();
    subscribers.clear();
  };

  return { getState, setState, subscribe, dispose };
}

export const appStore = createStore();
