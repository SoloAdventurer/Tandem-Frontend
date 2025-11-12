import React from "react";

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  rows = 3,
  maxLength,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label} {required && <span className="text-danger-500">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-4 py-2 rounded-lg border 
          focus:outline-none focus:ring-2 focus:ring-primary-500 
          transition-colors resize-none
          ${error ? "border-danger-500" : "border-neutral-300"}
          ${disabled ? "bg-neutral-100 cursor-not-allowed" : "bg-white"}
        `}
      />
      <div className="flex justify-between items-center mt-1">
        {error && <p className="text-sm text-danger-500">{error}</p>}
        {maxLength && (
          <p className="text-sm text-neutral-500 ml-auto">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
