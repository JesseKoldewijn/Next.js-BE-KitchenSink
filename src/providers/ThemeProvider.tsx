"use client";

import { createContext, use, useState } from "react";

export type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  setTheme?: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: undefined,
});

const ThemeProvider = ({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(initialTheme);

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    document.cookie = `nbk-theme=${theme}; path=/; max-age=31536000 sameSite=strict; secure=true;`;

    const htmlElem = document.querySelector("html");
    if (htmlElem) {
      const opositeTheme = theme === "dark" ? "light" : "dark";
      htmlElem.classList.remove(opositeTheme);
      htmlElem.classList.add(theme);
    }
  };

  const val = {
    theme,
    setTheme: handleThemeChange,
  };

  return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

export const useTheme = () => {
  const { theme, setTheme } = use(ThemeContext);

  if (!setTheme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return { theme, setTheme };
};
