import { createContext, useState, useEffect, ReactNode } from "react";
import { COLORS } from "../constants/colors";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: typeof COLORS.light | typeof COLORS.dark;
  currentColorScheme: ThemeType;
  toggleColorScheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentColorScheme, setCurrentColorScheme] =
    useState<ThemeType>("dark");

  const theme = currentColorScheme === "light" ? COLORS.light : COLORS.dark;

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "currentColorScheme"
    ) as ThemeType | null;
    if (savedTheme) {
      setCurrentColorScheme(savedTheme);
    }
  }, []);

  const toggleColorScheme = () => {
    const newColorScheme = currentColorScheme === "light" ? "dark" : "light";
    setCurrentColorScheme(newColorScheme);
    localStorage.setItem("currentColorScheme", newColorScheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, currentColorScheme, toggleColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
