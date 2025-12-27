import React from "react";

interface SessionProgressRingProps {
  progress: number; // 0 to 100
  size?: number; // diameter in pixels
  strokeWidth?: number;
}

const SessionProgressRing: React.FC<SessionProgressRingProps> = ({
  progress,
  size = 200,
  strokeWidth = 8,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--border-primary)"
        strokeWidth={strokeWidth}
        fill="none"
        opacity="0.3"
      />

      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 1s ease-in-out",
        }}
      />
    </svg>
  );
};

export default SessionProgressRing;
