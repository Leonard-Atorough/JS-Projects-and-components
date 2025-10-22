import type { Expense } from "../models/expense";
import { saveExpensesToLocal } from "../services/storage";

export function createBatchExpenseSaver(opts?: {
  delayMs?: number;
  saveFn?: (expenses: Expense[]) => void;
}) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const DEBOUNCE_DELAY = opts?.delayMs ?? 500;
  let latest: Expense[] = [];
  const saveFn = opts?.saveFn ?? saveExpensesToLocal;

  const flush = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    try {
      saveFn(latest);
    } catch {}
  };

  const notify = (expenses: Expense[]) => {
    latest = expenses;
    if (timeoutId) {
      clearTimeout;
    }
    timeoutId = setTimeout(() => {
      saveFn(latest);
    }, DEBOUNCE_DELAY);
  };
  const handleUnload = () => {
    flush();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("pagehide", handleUnload);
    window.addEventListener("beforeunload", handleUnload);
  }

  const dispose = () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("pagehide", handleUnload);
      window.removeEventListener("beforeunload", handleUnload);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return { flush, notify, dispose };
}
