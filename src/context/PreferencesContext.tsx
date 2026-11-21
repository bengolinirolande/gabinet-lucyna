import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PRACTICE } from '../data/practice';
import { PRACTICE_RU, type PracticeData } from '../data/practice.ru';
import { UI_STRINGS, type UiStrings } from '../data/uiStrings';
import {
  getRoutes,
  type Locale,
  type PageId,
  type RouteMeta,
  type Theme,
} from '../types/navigation';

const LANG_STORAGE_KEY = 'lucyna_lang';
const THEME_STORAGE_KEY = 'lucyna_theme';

function getInitialLang(): Locale {
  if (typeof window === 'undefined') return 'pl';
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'ru' || q === 'pl') return q;
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'ru' || stored === 'pl') return stored;
  } catch {
    // storage unavailable
  }
  return 'pl';
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const q = new URLSearchParams(window.location.search).get('theme');
    if (q === 'dark' || q === 'light') return q;
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // storage unavailable
  }
  return 'light';
}

interface PreferencesContextValue {
  lang: Locale;
  setLang: (next: Locale) => void;
  toggleLang: () => void;
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggleTheme: () => void;
  practice: PracticeData;
  ui: UiStrings;
  routes: Record<PageId, RouteMeta>;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Locale>(getInitialLang);
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setLang = useCallback((next: Locale) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'pl' ? 'ru' : 'pl');
  }, [lang, setLang]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  // Synchronize <html lang>, <html data-theme>, .dark class, and mobile browser theme-color
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#101715' : '#F6F3EE');
    }
  }, [theme]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang,
      theme,
      setTheme,
      toggleTheme,
      practice: lang === 'ru' ? PRACTICE_RU : PRACTICE,
      ui: UI_STRINGS[lang],
      routes: getRoutes(lang),
    }),
    [lang, setLang, toggleLang, theme, setTheme, toggleTheme]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return ctx;
}
