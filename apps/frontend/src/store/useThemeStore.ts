//save the theme in local storage so that everytime refresh our page we still have the selected them
// Zustand store to manage the theme of an application
import { create } from "zustand";
interface ThemeStore {
  theme: string; // The theme is a string
  setTheme: (theme: string) => void; // setTheme takes a string and returns void
}
//creating the Store

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));