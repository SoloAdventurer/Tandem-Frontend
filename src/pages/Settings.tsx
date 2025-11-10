import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme, themeInfo } from "../providers/ThemeProvider";
import ThemeCard from "../components/ThemeCard";
import LanguageSelector from "../components/LanguageSelector";
import NotificationSettings from "../components/NotificationSettings";
import AboutSection from "../components/AboutSection";

// Import theme background images
import lightBg from "../assets/themes/light.jpg";
import darkBg from "../assets/themes/dark.jpg";
import oceanBg from "../assets/themes/ocean-wave.jpg";
import forestBg from "../assets/themes/forest.jpg";
import contrastBg from "../assets/themes/contrast.jpg";

// Theme color and background configuration
const themeColorPreviews = {
  light: {
    textColor: "#000000ff", // Dark text for light bg
    textSecondary: "#000000ff", // Dark text for light bg
    accent: "#3b82f6",
    bgSecondary: "#f5f5f4c8",
    success: "#22c55e",
    backgroundImage: lightBg,
    gradient:
      "linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.46) 100%)",
  },
  dark: {
    textColor: "#fafaf9", // Light text for dark bg
    textSecondary: "#d6d3d1", // Light text for dark bg
    accent: "#60a5fa",
    bgSecondary: "#292524",
    success: "#4ade80",
    backgroundImage: darkBg,
    gradient:
      "linear-gradient(135deg, rgba(28, 25, 23, 0.95) 0%, rgba(41, 37, 36, 0.95) 100%)",
  },
  "high-contrast": {
    textColor: "#ffffff", // Light text for dark bg
    textSecondary: "#e0e0e0", // Light text for dark bg
    accent: "#00ff00",
    bgSecondary: "#1a1a1a",
    success: "#00ff00",
    backgroundImage: contrastBg,
    gradient:
      "linear-gradient(135deg, rgba(1, 56, 3, 0.98) 0%, rgba(30, 30, 30, 0.98) 100%)",
  },
  ocean: {
    textColor: "#f1f5f9", // Light text for dark bg
    textSecondary: "#cbd5e1", // Light text for dark bg
    accent: "#06b6d4",
    bgSecondary: "#1e293b",
    success: "#10b981",
    backgroundImage: oceanBg,
    gradient: "",
  },
  forest: {
    textColor: "#f0fdf4", // Light text for dark bg
    textSecondary: "#bbf7d0", // Light text for dark bg
    accent: "#4ade80",
    bgSecondary: "#166534",
    success: "#4ade80",
    backgroundImage: forestBg,
    gradient:
      "linear-gradient(135deg, rgba(20, 83, 45, 0.90) 0%, rgba(22, 101, 52, 0.90) 100%)",
  },
};
const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme, themes } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);

  return (
    <div
      className="min-h-screen p-6 md:p-8"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {t("settings.title")}
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            {t("settings.subtitle")}
          </p>
        </div>

        {/* Theme Section */}
        <section className="mb-8">
          <div
            className="p-6 rounded-lg mb-6"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderLeft: "4px solid var(--accent)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎨</span>
              <div>
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("settings.appearance.title")}
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t("settings.appearance.subtitle")}
                </p>
              </div>
            </div>

            {/* Theme Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((t) => {
                const info = themeInfo[t];
                const colors = themeColorPreviews[t];
                const isActive = theme === t;

                return (
                  <ThemeCard
                    key={t}
                    themeKey={t}
                    themeName={i18n.t(`settings.themes.${info.key}.name`)}
                    themeDescription={i18n.t(
                      `settings.themes.${info.key}.description`
                    )}
                    themeIcon={info.icon}
                    isActive={isActive}
                    colors={colors}
                    onSelect={() => setTheme(t)}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Language Section */}
        <LanguageSelector />

        {/* Notifications Section */}
        <NotificationSettings />

        {/* About Section */}
        <AboutSection />
      </div>
    </div>
  );
};

export default SettingsPage;
