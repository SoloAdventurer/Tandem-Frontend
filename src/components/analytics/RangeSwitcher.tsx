import React from "react";

export interface RangeOption {
  label: string;
  value: string;
}

interface RangeSwitcherProps {
  options: RangeOption[];
  value: string;
  onChange: (value: string) => void;
}

const RangeSwitcher: React.FC<RangeSwitcherProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex rounded-full border px-1 py-1 gap-1" style={{ borderColor: "var(--border-primary)" }}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-2"
            style={{
              backgroundColor: isActive ? "var(--accent-light)" : "transparent",
              color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
              "--tw-ring-color": "var(--accent-primary)",
            } as React.CSSProperties}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default RangeSwitcher;

