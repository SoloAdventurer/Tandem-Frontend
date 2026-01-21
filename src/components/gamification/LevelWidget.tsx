import React from "react";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LevelWidgetProps {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  levelTitle?: string; // e.g., "Focused", "Dedicated", "Elite"
}

const LevelWidget: React.FC<LevelWidgetProps> = ({
  currentLevel,
  currentXP,
  xpToNextLevel,
  levelTitle = "Studious",
}) => {
  const { t } = useTranslation();
  const progress = (currentXP / xpToNextLevel) * 100;

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
          <Zap className="mr-2 h-5 w-5 text-yellow-500" />
          {t("gamification.level", "Level")} {currentLevel}
        </h3>
        <div
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "var(--accent-primary)",
          }}
        >
          {levelTitle}
        </div>
      </div>

      <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
        {currentXP} / {xpToNextLevel} XP
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

      <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {t("gamification.nextLevel", "Next level")}: {xpToNextLevel - currentXP}{" "}
        XP {t("gamification.remaining", "remaining")}
      </div>
    </div>
  );
};

export default LevelWidget;
