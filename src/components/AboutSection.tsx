import React from "react";
import { useTranslation } from "react-i18next";

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section>
      <div
        className="p-6 rounded-lg"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">ℹ️</span>
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {t("settings.about.title")}
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span style={{ color: "var(--text-secondary)" }}>
              {t("settings.about.version")}
            </span>
            <span style={{ color: "var(--text-primary)" }}>1.0.0 (MVP)</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--text-secondary)" }}>
              {t("settings.about.build")}
            </span>
            <span style={{ color: "var(--text-primary)" }}>2025.01.15</span>
          </div>

          <div
            className="pt-4 border-t"
            style={{ borderColor: "var(--border-primary)" }}
          >
            <button
              className="w-full py-3 px-4 rounded-lg font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--text-inverse)",
              }}
            >
              {t("settings.about.feedback")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
