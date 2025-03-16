
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type StyleTheme = "cyber" | "premium";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultStyleTheme?: StyleTheme;
  storageKey?: string;
  styleStorageKey?: string;
}

interface ThemeContextType {
  theme: Theme;
  styleTheme: StyleTheme;
  setTheme: (theme: Theme) => void;
  setStyleTheme: (styleTheme: StyleTheme) => void;
}

const initialState: ThemeContextType = {
  theme: "system",
  styleTheme: "premium",
  setTheme: () => null,
  setStyleTheme: () => null,
};

const ThemeContext = createContext<ThemeContextType>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultStyleTheme = "premium",
  storageKey = "theme",
  styleStorageKey = "styleTheme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme) {
      return storedTheme as Theme;
    }
    return defaultTheme;
  });
  
  const [styleTheme, setStyleTheme] = useState<StyleTheme>(() => {
    const storedStyleTheme = localStorage.getItem(styleStorageKey);
    if (storedStyleTheme) {
      return storedStyleTheme as StyleTheme;
    }
    return defaultStyleTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("cyber-theme", "premium-theme");
    root.classList.add(`${styleTheme}-theme`);
  }, [styleTheme]);

  const value = {
    theme,
    styleTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    setStyleTheme: (styleTheme: StyleTheme) => {
      localStorage.setItem(styleStorageKey, styleTheme);
      setStyleTheme(styleTheme);
    },
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
