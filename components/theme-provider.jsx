"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

// Cycle order for the toggle button.
const ORDER = ["system", "light", "dark"];

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyResolved(resolved) {
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }) {
  // preference: what the user chose ("system" follows the OS)
  const [preference, setPreference] = useState("system");
  // resolved: the actual theme in effect ("light" | "dark")
  const [resolved, setResolved] = useState("dark");

  // Initialise from storage / current attribute on mount.
  useEffect(() => {
    let pref = "system";
    try {
      const saved = window.localStorage.getItem("theme");
      if (saved === "light" || saved === "dark" || saved === "system") pref = saved;
    } catch {
      /* ignore */
    }
    const res = pref === "system" ? systemTheme() : pref;
    setPreference(pref);
    setResolved(res);
    applyResolved(res);
  }, []);

  // When following the system, react live to OS theme changes (mobile + web).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (preference === "system") {
        const res = systemTheme();
        setResolved(res);
        applyResolved(res);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference]);

  const setTheme = useCallback((pref) => {
    const res = pref === "system" ? systemTheme() : pref;
    setPreference(pref);
    try {
      window.localStorage.setItem("theme", pref);
    } catch {
      /* ignore */
    }
    // Smoothly crossfade colors during a manual switch.
    const root = document.documentElement;
    root.classList.add("theme-transition");
    applyResolved(res);
    setResolved(res);
    window.setTimeout(() => root.classList.remove("theme-transition"), 450);
  }, []);

  const cycleTheme = useCallback(() => {
    const next = ORDER[(ORDER.indexOf(preference) + 1) % ORDER.length];
    setTheme(next);
  }, [preference, setTheme]);

  return (
    <ThemeContext.Provider value={{ preference, resolved, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
