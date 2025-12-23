import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  disabled,
  size = "md",
  type = "button",
}) => {
  const baseStyles =
    "font-bold transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  const variants = {
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-sm hover:shadow-md",
    success:
      "bg-success-500 text-white hover:bg-success-600 focus:ring-success-500 shadow-sm hover:shadow-md",
    danger:
      "bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500 shadow-sm hover:shadow-md",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
