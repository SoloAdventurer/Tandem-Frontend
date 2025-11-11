import React from "react";
import { useTranslation } from "react-i18next";
import { Home, BarChart3, Rocket, Timer, User } from "lucide-react";

interface BottomNavProps {
  currentPage: "home" | "analytics" | "start" | "solo" | "profile";
  onNavigate: (
    page: "home" | "analytics" | "start" | "solo" | "profile"
  ) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const { t } = useTranslation();

  const navItems = [
    {
      id: "home" as const,
      icon: Home,
      label: t("nav.home", "Home"),
    },
    {
      id: "analytics" as const,
      icon: BarChart3,
      label: t("nav.analytics", "Analytics"),
    },
    {
      id: "start" as const,
      icon: Rocket,
      label: t("nav.start", "Start"),
    },
    {
      id: "solo" as const,
      icon: Timer,
      label: t("nav.solo", "Solo"),
    },
    {
      id: "profile" as const,
      icon: User,
      label: t("nav.profile", "Profile"),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-primary)",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around h-20">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const isStart = item.id === "start";
            const IconComponent = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center min-w-[64px] px-3 py-2 transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 relative group"
                style={
                  {
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    backgroundColor: isActive
                      ? "var(--accent-light)"
                      : "transparent",
                    "--tw-ring-color": "var(--accent)",
                  } as React.CSSProperties
                }
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Glow effect for Start button on hover */}
                {isStart && (
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: "0 0 20px 4px var(--accent)",
                      filter: "blur(8px)",
                    }}
                  />
                )}

                <IconComponent
                  className="mb-1 transition-all duration-200 relative z-10"
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <span
                  className="text-xs font-medium relative z-10"
                  style={{
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <span
                    className="absolute bottom-1 w-1 h-1 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
