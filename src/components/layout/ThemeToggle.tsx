"use client";

import { LuMoon, LuSun } from "react-icons/lu";

import { useTheme } from "@/providers/ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 flex">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-md bg-neutral-900 p-2 text-neutral-200 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
      >
        {theme === "dark" ? (
          <LuSun className="h-5 w-5" />
        ) : (
          <LuMoon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
