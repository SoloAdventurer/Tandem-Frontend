import React from "react";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StudyTimeWidgetProps {
  monthlyHours: number;
  monthlyGoal: number; // e.g., 50 hours
  totalHours: number;
}

const StudyTimeWidget: React.FC<StudyTimeWidgetProps> = ({
  monthlyHours,
  monthlyGoal,
  totalHours,
}) => {
  const { t } = useTranslation();
  const progress = (monthlyHours / monthlyGoal) * 100;

  return (
    <div
      className="rounded-lg p-6 shadow-md"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-lg font-semibold flex items-center"
          style={{ color: "var(--text-primary)" }}
        >
          <Clock className="mr-2 h-5 w-5 text-blue-500" />
          {t("gamification.studyTime", "Study Time")}
        </h3>
      </div>

      <div
        className="text-3xl font-bold mb-1"
        style={{ color: "var(--accent-primary)" }}
      >
        {monthlyHours.toFixed(1)} {t("gamification.hours", "hours")}
      </div>

      <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
        {t("gamification.thisMonth", "this month")}
      </p>

      {/* Progress bar */}
      <div className="mb-2">
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--bg-tertiary)" }}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${Math.min(progress, 100)}%`,
              backgroundColor: "var(--accent-primary)",
            }}
          />
        </div>
      </div>

      <div
        className="text-xs flex justify-between"
        style={{ color: "var(--text-secondary)" }}
      >
        <span>
          {t("gamification.goal", "Goal")}: {monthlyGoal}{" "}
          {t("gamification.hours", "hours")}
        </span>
        <span>
          {t("gamification.lifetime", "Lifetime")}: {totalHours.toFixed(0)}h
        </span>
      </div>
    </div>
  );
};

export default StudyTimeWidget;
