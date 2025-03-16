
import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeType = "light" | "dark";
type StyleThemeType = "premium" | "cyber";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  styleTheme: StyleThemeType;
  setStyleTheme: (styleTheme: StyleThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  styleTheme: "premium",
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
    
    // Add new theme
    root.classList.add(theme);
    
    // Store in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old style themes
    root.classList.remove("premium", "cyber");
    
    // Add new style theme
    root.classList.add(styleTheme);
    
    // Store in localStorage
    localStorage.setItem("styleTheme", styleTheme);
  }, [styleTheme]);

  const value = {
    theme,
    setTheme,
    styleTheme,
    setStyleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
