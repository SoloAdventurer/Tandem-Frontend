import React from "react";
import { useTranslation } from "react-i18next";
import SettingsPage from "./Settings";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();

  // TODO: Replace with actual user data from auth/context
  const user = {
    name: "George Klooney",
    email: "ahmed.hassan@university.edu",
    university: "EUASS",
    level: 12,
    reputation: 487,
    sessionsCompleted: 24,
    completionRate: 92,
    joinDate: "January 2025",
    avatar: "AH", // Initials for avatar
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "transparent" }}>
      {/* Profile Header Section */}
      <div
        className="p-6 md:p-8 border-b"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-primary)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {t("profile.title", "Profile")}
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--text-inverse)",
              }}
            >
              {user.avatar}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {user.name}
                </h2>
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: "var(--accent-light)",
                    color: "var(--accent)",
                  }}
                >
                  Level {user.level}
                </span>
              </div>

              <p
                className="text-sm mb-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {user.email}
              </p>
              <p
                className="text-sm mb-3"
                style={{ color: "var(--text-tertiary)" }}
              >
                {user.university} • {t("profile.memberSince", "Member since")}{" "}
                {user.joinDate}
              </p>

              {/* Quick Stats */}
              <div className="flex gap-4 flex-wrap">
                <div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {user.sessionsCompleted}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t("profile.sessions", "Sessions")}
                  </div>
                </div>

                <div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--success)" }}
                  >
                    {user.completionRate}%
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t("profile.completion", "Completion")}
                  </div>
                </div>

                <div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--secondary-500)" }}
                  >
                    {user.reputation}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t("profile.reputation", "Reputation")}
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              {t("profile.editProfile", "Edit Profile")}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Section (embedded) */}
      <div style={{ backgroundColor: "transparent" }}>
        <SettingsPage />
      </div>
    </div>
  );
};

export default ProfilePage;
