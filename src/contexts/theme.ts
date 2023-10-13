import { createContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeContextValue = {
  theme: Theme;
};

export const ThemeContext = createContext({} as ThemeContextValue);
