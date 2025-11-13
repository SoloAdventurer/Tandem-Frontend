import React from "react";
import { useTranslation } from "react-i18next";

interface ThemeCardProps {
  themeKey: string;
  themeName: string;
  themeDescription: string;
  themeIcon: string;
  isActive: boolean;
  colors: {
    accent: string;
    bgSecondary: string;
    success: string;
    backgroundImage?: string;
    gradient: string;
    textColor: string;
    textSecondary: string;
  };
  onSelect: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  themeKey,
  themeName,
  themeDescription,
  themeIcon,
  isActive,
  colors,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onSelect}
      className={`
        relative text-left overflow-hidden rounded-lg border-2 
        transition-all duration-300 ease-in-out group
        ${isActive ? "-translate-y-0.5" : ""}
        hover:-translate-y-1 hover:shadow-xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
        focus-visible:ring-[var(--border-focus)] focus-visible:-translate-y-2
      `}
      style={{
        borderColor: isActive ? "var(--accent)" : "var(--border-primary)",
        boxShadow: isActive ? "var(--shadow-lg)" : "var(--shadow-sm)",
        minHeight: "180px",
      }}
      aria-label={`${t(
        "settings.appearance.select",
        "Select theme"
      )}: ${themeName}`}
    >
      {/* LAYER 1: Background Image */}
      {colors.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 
                     group-hover:opacity-60 group-hover:scale-110 
                     transition-all duration-500"
          style={{
            backgroundImage: `url(${colors.backgroundImage})`,
          }}
        />
      )}

      {/* LAYER 2: Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: colors.gradient,
        }}
      />

      {/* LAYER 3: Content */}
      <div className="relative p-4 z-10">
        {/* Theme Icon & Name */}
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-3xl drop-shadow-lg 
                       transition-transform duration-300 ease-in-out 
                       group-hover:scale-110"
            style={{
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          >
            {themeIcon}
          </span>
          {/* ... (Theme Name and Active badge) */}
          <div className="flex-1">
            <div
              className="font-semibold flex items-center gap-2 flex-wrap"
              style={{
                color: colors.textColor,
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {themeName}
              {isActive && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--text-inverse)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {t("settings.appearance.active")}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Theme Description */}
        <p
          className="text-sm mb-3"
          style={{
            color: colors.textSecondary,
            textShadow: "0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          {themeDescription}
        </p>

        {/* Color Preview Swatches */}
        <div className="flex gap-2">
          <div
            className="w-8 h-8 rounded border-2 shadow-md"
            style={{
              backgroundColor: colors.accent,
              borderColor: "rgba(0, 0, 0, 0.15)", // <-- CHANGED
            }}
            title="Accent color"
          />
          <div
            className="w-8 h-8 rounded border-2 shadow-md"
            style={{
              backgroundColor: colors.bgSecondary,
              borderColor: "rgba(0, 0, 0, 0.15)", // <-- CHANGED
            }}
            title="Background color"
          />
          <div
            className="w-8 h-8 rounded border-2 shadow-md"
            style={{
              backgroundColor: colors.success,
              borderColor: "rgba(0, 0, 0, 0.15)", // <-- CHANGED
            }}
            title="Success color"
          />
        </div>
      </div>
    </button>
  );
};

export default ThemeCard;
