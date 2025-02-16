import { ThemeContext } from "@/context/theme-context";
import { useContext } from "react";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ApiProvider");
  }
  return context;
};

export default useTheme;
