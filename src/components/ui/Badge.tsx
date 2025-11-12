import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
}) => {
  const variants = {
    default: "bg-neutral-100 text-neutral-800",
    success: "bg-success-100 text-success-800",
    warning: "bg-yellow-100 text-yellow-800", // No 'warning' in theme, using yellow
    danger: "bg-danger-100 text-danger-800",
    info: "bg-primary-100 text-primary-800", // Mapped 'info' to 'primary'
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
