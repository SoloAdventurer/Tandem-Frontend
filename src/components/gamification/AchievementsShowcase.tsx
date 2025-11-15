import React from "react";
import { useTranslation } from "react-i18next";
import { Award, Lock } from "lucide-react";

interface Achievement {
  id: string;
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress?: number; // e.g., 3 out of 5
  requirement?: number; // e.g., 5 total
}

interface AchievementsShowcaseProps {
  achievements?: Achievement[];
  onViewAll?: () => void;
}

const AchievementsShowcase: React.FC<AchievementsShowcaseProps> = ({
  achievements,
  onViewAll,
}) => {
  const { t } = useTranslation();

  // Default featured achievements to show (you can make this dynamic)
  const defaultAchievements: Achievement[] = [
    {
      id: "first_steps",
      icon: "🎯",
      name: t("achievements.firstSteps.name", "First Steps"),
      description: t(
        "achievements.firstSteps.desc",
        "Complete your first session"
      ),
      unlocked: false,
      progress: 0,
      requirement: 1,
    },
    {
      id: "night_owl",
      icon: "🦉",
      name: t("achievements.nightOwl.name", "Night Owl"),
      description: t(
        "achievements.nightOwl.desc",
        "Complete 10 sessions after 10pm"
      ),
      unlocked: false,
      progress: 0,
      requirement: 10,
    },
    {
      id: "early_bird",
      icon: "🌅",
      name: t("achievements.earlyBird.name", "Early Bird"),
      description: t(
        "achievements.earlyBird.desc",
        "Complete 10 sessions before 8am"
      ),
      unlocked: false,
      progress: 0,
      requirement: 10,
    },
    {
      id: "marathon_runner",
      icon: "🏃",
      name: t("achievements.marathonRunner.name", "Marathon Runner"),
      description: t(
        "achievements.marathonRunner.desc",
        "Complete 5 sessions of 90 minutes"
      ),
      unlocked: false,
      progress: 0,
      requirement: 5,
    },
    {
      id: "team_player",
      icon: "🤝",
      name: t("achievements.teamPlayer.name", "Team Player"),
      description: t(
        "achievements.teamPlayer.desc",
        "Get rated 5 stars by 20 partners"
      ),
      unlocked: false,
      progress: 0,
      requirement: 20,
    },
    {
      id: "century_club",
      icon: "💯",
      name: t("achievements.centuryClub.name", "Century Club"),
      description: t(
        "achievements.centuryClub.desc",
        "Complete 100 sessions total"
      ),
      unlocked: false,
      progress: 0,
      requirement: 100,
    },
  ];

  const displayAchievements = achievements || defaultAchievements;

  return (
    <div
      className="rounded-lg p-6 shadow-md mb-8"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl font-bold flex items-center"
            style={{ color: "var(--text-primary)" }}
          >
            <Award className="mr-3 h-6 w-6" />
            {t("achievements.title", "Achievements")}
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {t(
              "achievements.subtitle",
              "Complete sessions to unlock badges and rewards"
            )}
          </p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--accent-primary)" }}
          >
            {t("achievements.viewAll", "View All")}
          </button>
        )}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

// Individual Achievement Card Component
const AchievementCard: React.FC<{ achievement: Achievement }> = ({
  achievement,
}) => {
  const { t } = useTranslation();
  const progressPercentage = achievement.requirement
    ? ((achievement.progress || 0) / achievement.requirement) * 100
    : 0;

  return (
    <div
      className="relative rounded-lg p-4 transition-all hover:scale-105 cursor-pointer"
      style={{
        backgroundColor: achievement.unlocked
          ? "var(--bg-tertiary)"
          : "var(--bg-primary)",
        border: achievement.unlocked
          ? "2px solid var(--accent-primary)"
          : "2px solid var(--border-primary)",
        opacity: achievement.unlocked ? 1 : 0.7,
      }}
    >
      {/* Lock icon for locked achievements */}
      {!achievement.unlocked && (
        <div
          className="absolute top-2 right-2 rounded-full p-1"
          style={{
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <Lock
            className="h-3 w-3"
            style={{ color: "var(--text-secondary)" }}
          />
        </div>
      )}

      {/* Achievement Icon */}
      <div className="text-4xl mb-2 text-center filter grayscale-0">
        {achievement.unlocked ? achievement.icon : "🔒"}
      </div>

      {/* Achievement Name */}
      <h3
        className="text-sm font-semibold text-center mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {achievement.name}
      </h3>

      {/* Achievement Description */}
      <p
        className="text-xs text-center mb-2 line-clamp-2"
        style={{ color: "var(--text-secondary)" }}
      >
        {achievement.description}
      </p>

      {/* Progress Bar (only for locked achievements with progress) */}
      {!achievement.unlocked &&
        achievement.requirement &&
        achievement.progress !== undefined && (
          <div className="mt-2">
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${Math.min(progressPercentage, 100)}%`,
                  backgroundColor: "var(--accent-primary)",
                }}
              />
            </div>
            <p
              className="text-xs text-center mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {achievement.progress}/{achievement.requirement}
            </p>
          </div>
        )}

      {/* Unlocked Badge */}
      {achievement.unlocked && (
        <div
          className="text-xs font-medium text-center mt-2 py-1 rounded"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "var(--success)",
          }}
        >
          ✓ {t("achievements.unlocked", "Unlocked")}
        </div>
      )}
    </div>
  );
};

export default AchievementsShowcase;
