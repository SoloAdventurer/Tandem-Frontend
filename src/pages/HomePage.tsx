import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Rocket, List, Users } from "lucide-react";
import Button from "../components/Button";
import WelcomeModal from "../components/WelcomeModal";

interface HomePageProps {
  onNavigate: (
    page: "home" | "analytics" | "start" | "solo" | "profile"
  ) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

    if (!hasSeenWelcome) {
      // Show modal on first visit
      setShowWelcomeModal(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    // Mark as seen and close modal
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcomeModal(false);
  };

  return (
    <>
      {/* Welcome Modal */}
      {showWelcomeModal && <WelcomeModal onClose={handleCloseWelcome} />}

      <div className="max-w-screen-xl mx-auto px-4 pt-8 pb-24">
        {/* 1. Big Button to Start Page */}
        <div className="my-8 flex justify-center">
          <Button variant="primary" onClick={() => onNavigate("start")}>
            <span className="flex items-center justify-center text-lg font-semibold px-4 py-1">
              <Rocket className="mr-2 h-5 w-5" />
              {t("home.startSession", "Start New Session")}
            </span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 2. Recent Activity Section */}
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

          {/* 3. Recent Partners Section */}
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
