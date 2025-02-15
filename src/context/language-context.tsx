import { createContext, useState, useEffect } from "react";
import { INTERFACE_TEXT } from "../constants/text.js";

type LanguageType = "pt" | "en";
type TextType =
  | typeof INTERFACE_TEXT.portuguese
  | typeof INTERFACE_TEXT.english;

interface LanguageContextProps {
  text: TextType;
  currentLanguage: LanguageType;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(() => {
    return (localStorage.getItem("language") as LanguageType) || "pt";
  });

  const text =
    currentLanguage === "pt"
      ? INTERFACE_TEXT.portuguese
      : INTERFACE_TEXT.english;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "pt" ? "en" : "pt";
    setCurrentLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as LanguageType;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ text, currentLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
