import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const { t } = useTranslation();

  // Text content
  const title = t("welcome.title", "Welcome to Tandem!");
  const subtitle = t(
    "welcome.subtitle",
    "Find a study partner and get work done together."
  );

  // Calculate animation durations based on character count
  const titleDuration = Math.max(1.5, title.length * 0.05); // ~50ms per character, min 1.5s
  const subtitleDuration = Math.max(1.5, subtitle.length * 0.05);
  const subtitleDelay = titleDuration + 0.2; // Small gap between animations

  // Total cycle duration: title + subtitle + 5 second pause
  const totalDuration = titleDuration + subtitleDuration + 5;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      >
        {/* Modal Card */}
        <div
          className="relative max-w-4xl text-center w-full rounded-2xl p-12 shadow-2xl"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            border: "1px solid var(--border-primary)",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Title with typewriter */}
          <h2
            className="typewriter-loop text-5xl md:text-6xl font-bold mb-8 text-center"
            style={
              {
                color: "var(--text-primary)",
                "--duration": `${titleDuration}s`,
                "--char-count": title.length,
                "--delay": "0s",
                "--total-duration": `${totalDuration}s`,
              } as React.CSSProperties
            }
          >
            {title}
          </h2>

          {/* Subtitle with typewriter (delayed) */}
          <div>
            <p
              className="typewriter-loop text-2xl md:text-2xl mb-6 text-center"
              style={
                {
                  color: "var(--text-secondary)",
                  "--duration": `${subtitleDuration}s`,
                  "--char-count": subtitle.length,
                  "--delay": `${subtitleDelay}s`,
                  "--total-duration": `${totalDuration}s`,
                } as React.CSSProperties
              }
            >
              {subtitle}
            </p>
          </div>

          {/* Get Started Button */}
          <div className="flex justify-center mt-10 text-2xl">
            <Button variant="primary" onClick={onClose}>
              {t("welcome.getStarted", "Get Started")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeModal;
