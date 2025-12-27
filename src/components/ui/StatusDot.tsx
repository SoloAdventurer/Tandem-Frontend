import React from "react";

interface StatusDotProps {
  status: "active" | "idle" | "disconnected" | "waiting";
  size?: "sm" | "md" | "lg";
  withPulse?: boolean;
}

const StatusDot: React.FC<StatusDotProps> = ({
  status,
  size = "md",
  withPulse = true,
}) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const colors = {
    active: "bg-green-500",
    idle: "bg-yellow-500",
    disconnected: "bg-red-500",
    waiting: "bg-gray-500",
  };

  return (
    <div className="relative inline-flex">
      {/* Main dot */}
      <span
        className={`${sizeClasses[size]} ${colors[status]} rounded-full border-2`}
        style={{ borderColor: "var(--bg-primary)" }}
      />

      {/* Pulse animation for active status */}
      {withPulse && status === "active" && (
        <>
          <span
            className={`absolute inset-0 ${sizeClasses[size]} ${colors[status]} rounded-full opacity-75 animate-ping`}
            style={{ animationDuration: "2s" }}
          />
          <span
            className={`absolute inset-0 ${sizeClasses[size]} ${colors[status]} rounded-full opacity-50 animate-ping`}
            style={{ animationDuration: "2s", animationDelay: "1s" }}
          />
        </>
      )}
    </div>
  );
};

export default StatusDot;
