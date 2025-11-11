import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Toggle from "./Toggle";

const NotificationSettings: React.FC = () => {
  const { t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <section className="mb-8">
      <div
        className="p-6 rounded-lg"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔔</span>
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
            id="notifications-heading"
          >
            {t("settings.notifications.title")}
          </h2>
        </div>

        <div className="space-y-4">
          {/* Enable Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <p
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {t("settings.notifications.enable.label")}
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {t("settings.notifications.enable.description")}
              </p>
            </div>
            <Toggle
              enabled={notificationsEnabled}
              onChange={setNotificationsEnabled}
              ariaLabel={t("settings.notifications.enable.label")}
              size="md"
            />
          </div>

          {/* Sound Toggle */}
          <div
            className="flex items-center justify-between pt-4 border-t"
            style={{ borderColor: "var(--border-primary)" }}
          >
            <div className="flex-1 mr-4">
              <p
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {t("settings.notifications.sound.label")}
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {t("settings.notifications.sound.description")}
              </p>
            </div>
            <Toggle
              enabled={soundEnabled}
              onChange={setSoundEnabled}
              ariaLabel={t("settings.notifications.sound.label")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationSettings;
