import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Rocket, List, Users, Handshake, Award } from "lucide-react";
import Button from "../components/ui/Button";
import WelcomeModal from "../components/WelcomeModal";
import StreakWidget from "../components/gamification/StreakWidget";
import StudyTimeWidget from "../components/gamification/StudyTimeWidget";
import LevelWidget from "../components/gamification/LevelWidget";
import AchievementsShowcase from "../components/gamification/AchievementsShowcase";
import i18n from "../i18n";

interface HomePageProps {
  onNavigate: (
    page: "home" | "analytics" | "start" | "session" | "profile"
  ) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const isArabic = i18n.language === "ar";

  // TODO: Replace with actual API data
  const [userStats, setUserStats] = useState({
    currentStreak: 7,
    longestStreak: 14,
    monthlyHours: 47.5,
    totalHours: 156,
    currentLevel: 5,
    currentXP: 850,
    xpToNextLevel: 1000,
    levelTitle: "Focused",
  });

  // TODO: Replace with actual API
  const [achievements, setAchievements] = useState([
    {
      id: "first_steps",
      icon: "🎯",
      name: "First Steps",
      description: "Complete your first session",
      unlocked: true,
      progress: 1,
      requirement: 1,
    },
    {
      id: "night_owl",
      icon: "🦉",
      name: "Night Owl",
      description: "Complete 10 sessions after 10pm",
      unlocked: false,
      progress: 3,
      requirement: 10,
    },
    {
      id: "early_bird",
      icon: "🌅",
      name: "Early Bird",
      description: "Complete 10 sessions before 8am",
      unlocked: false,
      progress: 0,
      requirement: 10,
    },
    {
      id: "marathon_runner",
      icon: "🏃",
      name: "Marathon Runner",
      description: "Complete 5 sessions of 90 minutes",
      unlocked: false,
      progress: 2,
      requirement: 5,
    },
    {
      id: "team_player",
      icon: "🤝",
      name: "Team Player",
      description: "Get rated 5 stars by 20 partners",
      unlocked: false,
      progress: 5,
      requirement: 20,
    },
    {
      id: "century_club",
      icon: "💯",
      name: "Century Club",
      description: "Complete 100 sessions total",
      unlocked: false,
      progress: 47,
      requirement: 100,
    },
  ]);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
    }

    // TODO: Fetch user stats from API
    // fetchUserStats();
    // fetchAchievements();
  }, []);

  const handleCloseWelcome = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcomeModal(false);
  };

  return (
    <>
      {showWelcomeModal && <WelcomeModal onClose={handleCloseWelcome} />}

      <div className="fade-loop flex items-center text-3xl md:text-4xl font-bold px-2 py-2">
        {t("home.tandem")}
        <span className={isArabic ? "mr-1 mt-2" : "ml-2 mt-2"}>
          <Handshake />
        </span>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 pt-8 pb-24">
        {/* Start Button */}
        <div className="my-8 flex justify-center">
          <Button variant="primary" onClick={() => onNavigate("start")}>
            <span className="flex items-center justify-center text-xl font-semibold px-4 py-1">
              <Rocket className="mr-2 h-5 w-5" />
              {t("home.startSession", "Start New Session")}
            </span>
          </Button>
        </div>

        {/** Achievements Showcase */}
        <AchievementsShowcase
          achievements={achievements}
          onViewAll={() => {
            /** TODO: Open full achievements modal/page */
          }}
        />

        {/* Gamification Widgets - 3 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StreakWidget
            currentStreak={userStats.currentStreak}
            longestStreak={userStats.longestStreak}
            nextMilestone={14}
          />
          <StudyTimeWidget
            monthlyHours={userStats.monthlyHours}
            monthlyGoal={50}
            totalHours={userStats.totalHours}
          />
          <LevelWidget
            currentLevel={userStats.currentLevel}
            currentXP={userStats.currentXP}
            xpToNextLevel={userStats.xpToNextLevel}
            levelTitle={userStats.levelTitle}
          />
        </div>

        {/* Recent Achievements Preview */}
        <div
          className="rounded-lg p-6 shadow-md mb-8"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-semibold flex items-center"
              style={{ color: "var(--text-primary)" }}
            >
              <Award className="mr-3 h-5 w-5" />
              {t("gamification.recentAchievements", "Recent Achievements")}
            </h2>
            <button
              className="text-sm font-medium hover:underline"
              style={{ color: "var(--accent-primary)" }}
              onClick={() => {
                /* TODO: Open achievements modal/page */
              }}
            >
              {t("gamification.viewAll", "View All")}
            </button>
          </div>

          {/* TODO: Add achievement badge preview grid */}
          <div
            className="text-center py-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {t(
              "gamification.noAchievements",
              "Complete sessions to unlock achievements!"
            )}
          </div>
        </div>

        {/* Existing sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-lg p-6 shadow-md"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <h2
              className="text-xl font-semibold mb-4 flex items-center"
              style={{ color: "var(--text-primary)" }}
            >
              <List className="mr-3 h-5 w-5" />
              {t("home.recentActivity", "Recent Activity")}
            </h2>
            <div
              className="text-center py-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("home.noActivity", "No recent activity yet.")}
            </div>
          </div>

          <div
            className="rounded-lg p-6 shadow-md"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <h2
              className="text-xl font-semibold mb-4 flex items-center"
              style={{ color: "var(--text-primary)" }}
            >
              <Users className="mr-3 h-5 w-5" />
              {t("home.recentPartners", "Recent Partners")}
            </h2>
            <div
              className="text-center py-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("home.noPartners", "No recent partners yet.")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
