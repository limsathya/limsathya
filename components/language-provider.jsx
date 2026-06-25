"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, defaultLocale } from "@/lib/i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(defaultLocale);

  // Restore a saved preference on mount.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("locale");
      if (saved && dictionaries[saved]) setLocaleState(saved);
    } catch {
      /* localStorage unavailable — ignore */
    }
  }, []);

  // Keep <html lang> in sync for accessibility and SEO.
  useEffect(() => {
    const dict = dictionaries[locale] || dictionaries[defaultLocale];
    document.documentElement.lang = dict.htmlLang;
  }, [locale]);

  const setLocale = (next) => {
    if (!dictionaries[next]) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem("locale", next);
    } catch {
      /* ignore */
    }
  };

  const t = dictionaries[locale] || dictionaries[defaultLocale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
