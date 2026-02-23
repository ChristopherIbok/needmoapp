"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";
type ThemeMode = "auto" | Theme;

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.toggleAttribute("data-theme-transitioning", true);
  if (t === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  root.setAttribute("data-theme", t);
  window.setTimeout(() => {
    root.removeAttribute("data-theme-transitioning");
  }, 300);
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getForcedTheme(): Theme | null {
  const forced = document.body?.getAttribute("data-force-theme");
  return forced === "light" || forced === "dark" ? forced : null;
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("auto");
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  const computeEffective = useCallback((m: ThemeMode): Theme => {
    const forced = getForcedTheme();
    if (forced) return forced;
    if (m === "auto") return getSystemTheme();
    return m;
  }, []);

  useEffect(() => {
    setMounted(true);
    const storedRaw =
      localStorage.getItem("needmo-theme-preference") ??
      localStorage.getItem("needmo-theme");
    const stored: ThemeMode | null =
      storedRaw === "light" || storedRaw === "dark" || storedRaw === "auto" ? (storedRaw as ThemeMode) : null;
    const initialMode: ThemeMode = stored ?? "auto";
    setMode(initialMode);
    const eff = computeEffective(initialMode);
    setTheme(eff);
    applyTheme(eff);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if ((stored ?? "auto") === "auto") {
        const effNew = computeEffective("auto");
        setTheme(effNew);
        applyTheme(effNew);
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    const mo = new MutationObserver(() => {
      const effNew = computeEffective(initialMode);
      setTheme(effNew);
      applyTheme(effNew);
    });
    if (document.body) {
      mo.observe(document.body, { attributes: true, attributeFilter: ["data-force-theme"] });
    }
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      mo.disconnect();
    };
  }, [computeEffective]);

  const setThemeMode = useCallback((m: ThemeMode) => {
    setMode(m);
    // Write to both keys for compatibility
    localStorage.setItem("needmo-theme-preference", m);
    localStorage.setItem("needmo-theme", m);
    const eff = m === "auto" ? getSystemTheme() : m;
    setTheme(eff);
    applyTheme(eff);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(theme === "light" ? "dark" : "light");
  }, [theme, setThemeMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        if (mode === "auto") {
          setThemeMode("dark");
        } else if (mode === "dark") {
          setThemeMode("light");
        } else {
          setThemeMode("auto");
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mode, setThemeMode]);

  return { theme, mode, setThemeMode, toggleTheme, mounted };
}
