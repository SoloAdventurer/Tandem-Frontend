// src/providers/FontProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface FontContextType {
  englishFont: string;
  arabicFont: string;
  setEnglishFont: (font: string) => void;
  setArabicFont: (font: string) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [englishFont, setEnglishFont] = useState(
    localStorage.getItem("englishFont") || "Inter"
  );
  const [arabicFont, setArabicFont] = useState(
    localStorage.getItem("arabicFont") || "Cairo"
  );

  useEffect(() => {
    localStorage.setItem("englishFont", englishFont);
    localStorage.setItem("arabicFont", arabicFont);

    // Update CSS variables
    document.documentElement.style.setProperty("--font-english", englishFont);
    document.documentElement.style.setProperty("--font-arabic", arabicFont);

    // Load fonts dynamically
    loadGoogleFont(englishFont);
    loadGoogleFont(arabicFont);
  }, [englishFont, arabicFont]);

  return (
    <FontContext.Provider
      value={{ englishFont, arabicFont, setEnglishFont, setArabicFont }}
    >
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) throw new Error("useFont must be used within FontProvider");
  return context;
};

// Helper to load Google Fonts dynamically
const loadGoogleFont = (fontName: string) => {
  const link = document.getElementById(`font-${fontName}`) as HTMLLinkElement;
  if (link) return; // Already loaded

  const newLink = document.createElement("link");
  newLink.id = `font-${fontName}`;
  newLink.rel = "stylesheet";
  newLink.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
    " ",
    "+"
  )}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(newLink);
};
