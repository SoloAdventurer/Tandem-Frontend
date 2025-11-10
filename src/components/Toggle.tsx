import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../providers/ThemeProvider";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  ariaLabel?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  ariaLabel,
}) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isRTL = i18n.language === "ar";

  // Theme-specific animations and effects
  const getThemeStyles = () => {
    switch (theme) {
      case "high-contrast":
        return {
          trackEnabled: "var(--accent)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
          glowEffect: enabled ? "0 0 12px rgba(0, 255, 0, 0.4)" : "none",
        };
      case "ocean":
        return {
          trackEnabled: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 2px 8px rgba(6, 182, 212, 0.4)",
          glowEffect: enabled ? "0 0 16px rgba(6, 182, 212, 0.3)" : "none",
        };
      case "forest":
        return {
          trackEnabled: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 2px 8px rgba(74, 222, 128, 0.4)",
          glowEffect: enabled ? "0 0 16px rgba(74, 222, 128, 0.3)" : "none",
        };
      case "dark":
        return {
          trackEnabled: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 2px 6px rgba(59, 130, 246, 0.3)",
          glowEffect: enabled ? "0 0 12px rgba(59, 130, 246, 0.2)" : "none",
        };
      default: // light
        return {
          trackEnabled: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          glowEffect: "none",
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <button
      onClick={() => onChange(!enabled)}
      className="relative w-14 h-7 rounded-full transition-all duration-300 ease-in-out flex-shrink-0 group"
      style={{
        background: enabled
          ? themeStyles.trackEnabled
          : themeStyles.trackDisabled,
        boxShadow: themeStyles.glowEffect,
      }}
      aria-label={ariaLabel || label}
      aria-checked={enabled}
      role="switch"
    >
      {/* Track inner shadow for depth */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: enabled
            ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
            : "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      />

      {/* Thumb */}
      <span
        className="absolute top-0.5 w-6 h-6 rounded-full bg-white transition-all duration-300 ease-in-out group-hover:scale-110"
        style={{
          left: isRTL ? "auto" : enabled ? "30px" : "2px",
          right: isRTL ? (enabled ? "30px" : "2px") : "auto",
          boxShadow: themeStyles.thumbShadow,
        }}
      >
        {/* Inner highlight for 3D effect */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent 50%)",
          }}
        />
      </span>

      {/* Ripple effect on interaction */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-active:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%)",
        }}
      />
    </button>
  );
};

export default Toggle;
