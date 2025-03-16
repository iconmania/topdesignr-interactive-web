
import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeType = "light" | "dark";
type StyleThemeType = "premium" | "cyber";

interface ThemeContextType {
  theme: ThemeType;
  styleTheme: StyleThemeType;
  setTheme: (theme: ThemeType) => void;
  setStyleTheme: (styleTheme: StyleThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  styleTheme: "premium",
  setTheme: () => {},
  setStyleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
  defaultStyleTheme?: StyleThemeType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
  defaultStyleTheme = "premium",
}) => {
  const [theme, setTheme] = useState<ThemeType>(
    () => (localStorage.getItem("theme") as ThemeType) || defaultTheme
  );

  const [styleTheme, setStyleTheme] = useState<StyleThemeType>(
    () => (localStorage.getItem("styleTheme") as StyleThemeType) || defaultStyleTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old themes
    root.classList.remove("light", "dark");
    root.classList.remove("premium", "cyber");
    
    // Add new themes
    root.classList.add(theme);
    root.classList.add(styleTheme);
    
    // Store in localStorage
    localStorage.setItem("theme", theme);
    localStorage.setItem("styleTheme", styleTheme);
  }, [theme, styleTheme]);

  const value = {
    theme,
    styleTheme,
    setTheme,
    setStyleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
