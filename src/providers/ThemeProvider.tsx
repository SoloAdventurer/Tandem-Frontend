// src/providers/ThemeProvider.tsx

import React, { createContext, useContext, useEffect, useState } from "react";

// Define available themes (must match data-theme values in CSS)
export type Theme = "light" | "dark" | "high-contrast" | "ocean" | "forest";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme metadata (for UI display only - actual colors come from CSS)
// Icons are universal, names/descriptions should come from i18n translations
export const themeInfo: Record<
  Theme,
  { name: string; description: string; icon: string; key: string }
> = {
  light: {
    name: "Light",
    description: "Clean and bright for daytime use",
    icon: "☀️",
    key: "light", // for i18n lookup
  },
  dark: {
    name: "Dark",
    description: "Easy on the eyes for night sessions",
    icon: "🌙",
    key: "dark",
  },
  "high-contrast": {
    name: "High Contrast",
    description: "Maximum readability and accessibility",
    icon: "⚡",
    key: "highContrast",
  },
  ocean: {
    name: "Ocean",
    description: "Calm blue tones for deep focus",
    icon: "🌊",
    key: "ocean",
  },
  forest: {
    name: "Forest",
    description: "Natural green for a zen workflow",
    icon: "🌲",
    key: "forest",
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Get saved theme from localStorage
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || "light";
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    // Apply theme attribute to document root
    // All theme colors are handled by CSS using [data-theme="..."] selectors
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes: Object.keys(themeInfo) as Theme[],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
