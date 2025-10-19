import { createInMemoryLocalStorage } from "./src/__mocks__/createInMemoryLocalStorage";
import { vi } from "vitest";

// // Create a fresh mock for every test file (Vitest clears the module cache
// // between files, so a single instance per file is fine).
const mockLocalStorage = createInMemoryLocalStorage();

// // Stub the global before any user code is imported.
vi.stubGlobal("localStorage", mockLocalStorage);
