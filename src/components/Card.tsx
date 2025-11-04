import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hover = false,
}) => {
  const baseStyles = "bg-white rounded-lg shadow-md p-6";
  const hoverStyles = hover
    ? "hover:shadow-lg transition-shadow cursor-pointer"
    : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
