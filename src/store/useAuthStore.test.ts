import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import useAuthStore from "./useAuthStore";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(global, "localStorage", { value: localStorageMock });

describe("useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
    const store = useAuthStore.getState();
    // Reset store state for each test
    store.logout(); 
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with isAuthenticated as false", () => {
    const { isAuthenticated } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
  });

  it("should set isAuthenticated to true on login if user has a valid token", () => {
    localStorage.setItem("user", JSON.stringify({ token: "valid_token" }));
    const { login } = useAuthStore.getState();

    login();

    const { isAuthenticated } = useAuthStore.getState();
    expect(isAuthenticated).toBe(true);
  });

  it("should not set isAuthenticated to true on login if user does not have a valid token", () => {
    localStorage.setItem("user", JSON.stringify({}));
    const { login } = useAuthStore.getState();

    login();

    const { isAuthenticated } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
  });

  it("should set isAuthenticated to false on logout and clear localStorage", () => {
    const { login, logout } = useAuthStore.getState();

    localStorage.setItem("user", JSON.stringify({ token: "valid_token" }));
    login();

    // Ensure the user is logged in
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    logout();

    const { isAuthenticated } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(localStorage.getItem("user")).toBeNull();
  });
});
