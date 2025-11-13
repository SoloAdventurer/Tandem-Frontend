import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../providers/ThemeProvider";

interface Option {
  label: string;
  value: string | number;
}

interface SelectableButtonGroupProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
}

/**
 * A component to render a group of buttons where only one can be selected.
 * Used for session duration, work style preferences, etc.
 */
const SelectableButtonGroup: React.FC<SelectableButtonGroupProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const getThemeStyles = (isSelected: boolean) => {
    if (isSelected) {
      return {
        backgroundColor: "var(--accent)",
        color: "var(--text-inverse)",
        border: "1px solid var(--accent)",
        boxShadow:
          theme === "high-contrast"
            ? "0 0 8px rgba(0, 255, 0, 0.6)"
            : "0 4px 12px rgba(0, 0, 0, 0.1)",
        transform: "scale(1.02)",
      };
    }
    return {
      backgroundColor: "var(--bg-tertiary)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border-primary)",
    };
  };

  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className="px-4 py-3 md:px-6 md:py-4 rounded-lg font-semibold transition-all duration-200 ease-out"
              style={{
                ...getThemeStyles(isSelected),
                flex: "1 1 auto", // Allow buttons to grow and wrap
              }}
            >
              {t(option.label)} {/* Use t() for potential translations */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectableButtonGroup;
