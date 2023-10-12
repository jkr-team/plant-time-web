import React, { createContext } from "react";

type ThemeContextValue = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

export const ThemeContext = createContext({} as ThemeContextValue);
