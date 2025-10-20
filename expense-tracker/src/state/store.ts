import { loadExpenseAsync, saveExpensesToLocal } from "../services/storage";
import type { AppState } from "./types";

export async function createStore(InitialPartial: Partial<AppState> = {}) {
  let state: AppState = {
    expenses: await loadExpenseAsync(),
    isLoading: false,
    ...InitialPartial,
  };
  const listeners = new Set<(s: AppState) => void>();

  const getState = (): AppState => ({ ...state });

  const setState = (updater: (prev: AppState) => AppState): void => {
    const newState = updater(state);
    if (newState.expenses !== state.expenses) saveExpensesToLocal(newState.expenses);
    state = newState;
    emit();
  };

  const subscribe = (fn: (state: AppState) => void): (() => void) => {
    listeners.add(fn);
    fn(getState());

    return () => listeners.delete(fn);
  };

  const emit = () => {
    const snapshot = getState();

    for (const listener of listeners) {
      try {
        listener(snapshot);
      } catch (e) {
        console.error("State listener threw", e);
      }
    }
  };

  return { getState, setState, subscribe };
}

export const appStore = createStore();
