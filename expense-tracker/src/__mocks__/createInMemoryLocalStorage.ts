export function createInMemoryLocalStorage() {
  const store = new Map<string, string>();

  return {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },

    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
}
