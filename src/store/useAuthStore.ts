import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthSore {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthSore>(
    (set) => ({
      isAuthenticated: false,
      login: () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.token) {
          set({ isAuthenticated: true });
        }
      },
      logout: () => {
        set({ isAuthenticated: false });
        localStorage.clear();
      },
    }),
    {
      name: "userAuth",
    }
  )
);

export default useAuthStore;
