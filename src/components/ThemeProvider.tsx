"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeMode = "auto" | "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<ThemeMode>("auto");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);

    // Get stored preference
    const stored = localStorage.getItem(
      "needmo-theme-preference"
    ) as ThemeMode | null;
    if (stored && ["auto", "light", "dark"].includes(stored)) {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Determine actual theme based on mode
    let actualTheme: Theme;
    if (mode === "auto") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      actualTheme = prefersDark ? "dark" : "light";
    } else {
      actualTheme = mode;
    }

    setTheme(actualTheme);

    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(actualTheme);
    root.style.colorScheme = actualTheme;
    root.setAttribute("data-theme", actualTheme);

    // Store preference
    localStorage.setItem("needmo-theme-preference", mode);
  }, [mode, mounted]);

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted || mode !== "auto") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);

      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      root.style.colorScheme = newTheme;
      root.setAttribute("data-theme", newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode, mounted]);

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const toggleTheme = () => {
    if (mode === "auto") {
      // If in auto, switch to opposite of current theme
      const newMode = theme === "light" ? "dark" : "light";
      setMode(newMode);
    } else {
      // If in light/dark, toggle to opposite
      const newMode = mode === "light" ? "dark" : "light";
      setMode(newMode);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, mode, setThemeMode, toggleTheme, mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
