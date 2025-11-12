// src/components/common/Toggle.tsx

import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./../../providers/ThemeProvider";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  ariaLabel,
  size = "md",
}) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const isRTL = i18n.language === "ar";
  const springTiming =
    "[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]";

  // Size configurations
  const sizes = {
    sm: { width: 44, height: 24, knob: 20, translate: 20 },
    md: { width: 56, height: 28, knob: 24, translate: 28 },
    lg: { width: 68, height: 32, knob: 28, translate: 36 },
  };

  const config = sizes[size];

  // Theme-specific animations and effects
  const getThemeStyles = () => {
    switch (theme) {
      case "high-contrast":
        return {
          trackEnabled: "var(--accent)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
          glowEffect: enabled ? "0 0 12px rgba(0, 255, 0, 0.4)" : "none",
          iconColor: "#00ff00",
        };
      case "ocean":
        return {
          trackEnabled: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 2px 8px rgba(6, 182, 212, 0.4)",
          glowEffect: enabled ? "0 0 16px rgba(6, 182, 212, 0.3)" : "none",
          iconColor: "#06b6d4",
        };
      case "forest":
        return {
          trackEnabled: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 2px 8px rgba(74, 222, 128, 0.4)",
          glowEffect: enabled ? "0 0 16px rgba(74, 222, 128, 0.3)" : "none",
          iconColor: "#4ade80",
        };
      case "dark":
        return {
          trackEnabled: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 2px 6px rgba(59, 130, 246, 0.3)",
          glowEffect: enabled ? "0 0 12px rgba(59, 130, 246, 0.2)" : "none",
          iconColor: "#60a5fa",
        };
      default: // light
        return {
          trackEnabled: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          trackDisabled: "var(--border-secondary)",
          thumbShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          glowEffect: "none",
          iconColor: "#3b82f6",
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="relative rounded-full transition-all duration-300 ease-out flex-shrink-0 group focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={
        {
          width: `${config.width}px`,
          height: `${config.height}px`,
          background: enabled
            ? themeStyles.trackEnabled
            : themeStyles.trackDisabled,
          boxShadow: themeStyles.glowEffect,
          "--tw-ring-color": "var(--accent)",
        } as React.CSSProperties
      }
      aria-label={ariaLabel || label}
      aria-checked={enabled}
      role="switch"
    >
      {/* Track inner shadow for depth */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          boxShadow: enabled
            ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
            : "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      />

      {/* Gradient overlay for extra dimension */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: enabled
            ? "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)",
          opacity: enabled ? 1 : 0.5,
        }}
      />

      {/* Animated Thumb with Icons */}
      <span
        className={`absolute top-1/2 rounded-full bg-white transition-all duration-300 flex items-center justify-center ${springTiming}`}
        style={{
          width: `${config.knob}px`,
          height: `${config.knob}px`,
          transform: `translateY(-50%)`,
          left: isRTL
            ? "auto"
            : enabled
            ? `${config.width - config.knob - 2}px`
            : "2px",
          right: isRTL
            ? enabled
              ? `${config.width - config.knob - 2}px`
              : "2px"
            : "auto",
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

        {/* Checkmark icon (when enabled) */}
        <svg
          className={`relative transition-all duration-300 ${springTiming}`}
          style={{
            width: `${config.knob * 0.6}px`,
            height: `${config.knob * 0.6}px`,
            opacity: enabled ? 1 : 0,
            transform: enabled
              ? "scale(1) rotate(0deg)"
              : "scale(0.3) rotate(-180deg)",
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke={themeStyles.iconColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>

        {/* X icon (when disabled) */}
        <svg
          className={`absolute transition-all duration-300 ${springTiming}`}
          style={{
            width: `${config.knob * 0.5}px`,
            height: `${config.knob * 0.5}px`,
            opacity: enabled ? 0 : 1,
            transform: enabled
              ? "scale(0.3) rotate(180deg)"
              : "scale(1) rotate(0deg)",
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </span>

      {/* Ripple effect on interaction */}
      <span
        className="
          absolute inset-0 rounded-full pointer-events-none 
          transition-all duration-300 ease-out 
          opacity-0 group-hover:opacity-100 // <-- ADDED: Activate on hover
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent 60%)", // Softer glow
          transform: "scale(0.8)", // Start slightly smaller
        }}
      />

      {/* Click pulse animation */}
      <style>{`
        .group:active span:last-child {
          animation: togglePulse 0.4s ease-out;
        }
        
        @keyframes togglePulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default Toggle;
