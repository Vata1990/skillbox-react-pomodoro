import { Theme, THEME_KEY } from './../models/theme';
import React, { useLayoutEffect, useState } from 'react';

export const useTheme = (): [
  Theme,
  React.Dispatch<React.SetStateAction<Theme>>
] => {
  const defaultTheme: Theme =
    (localStorage.getItem(THEME_KEY) as Theme) || 'light';

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useLayoutEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme];
};
