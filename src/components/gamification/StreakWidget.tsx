import React from "react";
import { Flame } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StreakWidgetProps {
  currentStreak: number;
  longestStreak: number;
  nextMilestone: number; // e.g., 7, 14, 30
}

const StreakWidget: React.FC<StreakWidgetProps> = ({
  currentStreak,
  longestStreak,
  nextMilestone,
}) => {
  const { t } = useTranslation();
  const progress = (currentStreak / nextMilestone) * 100;

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
          <Flame className="mr-2 h-5 w-5 text-orange-500" />
          {t("gamification.streak", "Study Streak")}
        </h3>
        <div
          className="text-3xl font-bold"
          style={{ color: "var(--accent-primary)" }}
        >
          {currentStreak}
        </div>
      </div>

      <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
        {currentStreak > 0
          ? t("gamification.keepGoing", "Keep it going!")
          : t(
              "gamification.startStreak",
              "Complete a session to start your streak"
            )}
      </p>

      {/* Progress bar to next milestone */}
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
          {t("gamification.nextGoal", "Next goal")}: {nextMilestone}{" "}
          {t("gamification.days", "days")}
        </span>
        <span>
          {t("gamification.longest", "Longest")}: {longestStreak}
        </span>
      </div>
    </div>
  );
};

export default StreakWidget;
