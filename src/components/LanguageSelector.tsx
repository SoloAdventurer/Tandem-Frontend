import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <section className="mb-8">
      <div
        className="p-6 rounded-lg"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌍</span>
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {t("settings.language.title")}
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {t("settings.language.subtitle")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => changeLanguage("en")}
            className="p-4 rounded-lg border-2 transition-all hover:scale-105"
            style={{
              backgroundColor:
                i18n.language === "en"
                  ? "var(--accent-light)"
                  : "var(--bg-tertiary)",
              borderColor:
                i18n.language === "en"
                  ? "var(--accent)"
                  : "var(--border-primary)",
              color: "var(--text-primary)",
            }}
          >
            <div className="text-2xl mb-2">en</div>
            <div className="font-bold">English</div>
          </button>

          <button
            onClick={() => changeLanguage("ar")}
            className="p-4 rounded-lg border-2 transition-all hover:scale-105"
            style={{
              backgroundColor:
                i18n.language === "ar"
                  ? "var(--accent-light)"
                  : "var(--bg-tertiary)",
              borderColor:
                i18n.language === "ar"
                  ? "var(--accent)"
                  : "var(--border-primary)",
              color: "var(--text-primary)",
            }}
          >
            <div className="text-2xl mb-2">ar</div>
            <div className="font-bold">العربية</div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LanguageSelector;
