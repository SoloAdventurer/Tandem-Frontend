import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface TimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  autoStart?: boolean;
}

const Timer: React.FC<TimerProps> = ({
  duration,
  onComplete,
  autoStart = false,
}) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const percentage = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-6xl font-bold text-neutral-800 font-mono">
        {formatTime(timeLeft)}
      </div>
      <div className="relative w-48 h-48">
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-neutral-200"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 88}
            strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
            className="text-primary-600 transition-all duration-1000"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold text-neutral-600">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {isRunning ? t("timer.pause") : t("timer.start")}
        </button>
        <button
          onClick={() => {
            setTimeLeft(duration);
            setIsRunning(false);
          }}
          className="px-6 py-2 bg-neutral-200 text-primary-100 rounded-lg hover:bg-neutral-300 transition-colors"
        >
          {t("timer.reset")}
        </button>
      </div>
    </div>
  );
};

export default Timer;
