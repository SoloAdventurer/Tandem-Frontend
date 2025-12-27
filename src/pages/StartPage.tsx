import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import Button from "../components/ui/Button";
import SelectableButtonGroup from "../components/ui/SelectableButtonGroup";
import MultiGoalInput from "../components/ui/MultiGoalInput";
import { useSessionSocket } from "../providers/SessionProvider";

interface StartPageProps {
  onNavigate: (
    page: "home" | "analytics" | "start" | "session" | "profile"
  ) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { connect, sendMessage, status } = useSessionSocket();

  // Form state
  const [duration, setDuration] = useState<number>(25);
  const [studyGoals, setStudyGoals] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Duration options
  const durationOptions = [
    { label: t("start.duration.25min", "25 min"), value: 25 },
    { label: t("start.duration.50min", "50 min"), value: 50 },
    { label: t("start.duration.90min", "90 min"), value: 90 },
  ];

  const handleFindPartner = async () => {
    setIsSubmitting(true);
    if (status !== "connected") {
      await connect();
    } else {
      // Already connected, just send message
      sendInitSession();
    }
  };

  const sendInitSession = () => {
    // Navigate first so SessionPage is mounted to receive the response
    onNavigate("session");
    // Small delay to ensure navigation completes before sending
    setTimeout(() => {
      sendMessage({
        type: "init_session",
        tasks: studyGoals.filter((g) => g.trim().length > 0), // Only send non-empty goals
        focus_duration: convertDuration(duration),
      });
    }, 50);
  };

  const convertDuration = (mins: number) => {
    // Basic conversion 25 -> 00:25:00
    // Assuming duration is in minutes.
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:00`;
  };

  useEffect(() => {
    if (isSubmitting && status === "connected") {
      sendInitSession();
      setIsSubmitting(false);
    }
  }, [status, isSubmitting]);

  // Check if form is valid - at least one goal has content
  const isFormValid = studyGoals.some((goal) => goal.trim().length > 0);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 pb-24">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {t("start.title", "Start New Session")}
        </h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          {t("start.subtitle", "Find a study partner in the next 2 minutes")}
        </p>
      </div>

      {/* Form Container */}
      <div
        className="rounded-lg p-6 shadow-md space-y-8"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-primary)",
        }}
      >
        {/* Session Duration */}
        <div>
          <SelectableButtonGroup
            label={t("start.duration.label", "Session Duration")}
            options={durationOptions}
            value={duration}
            onChange={(value) => setDuration(value as number)}
          />
        </div>

        {/* Study Goals - Multi-goal Input */}
        <div>
          <MultiGoalInput
            goals={studyGoals}
            onChange={setStudyGoals}
            maxGoals={3}
            maxLength={150}
          />
        </div>

        {/* Info Box */}
        <div
          className="rounded-lg p-4"
          style={{
            backgroundColor: "var(--info-bg)",
            borderLeft: "4px solid var(--info)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--text-primary)" }}>
            💡{" "}
            {t(
              "start.info",
              "You'll be matched with a partner who has similar availability and work style. Both of you will confirm each other's presence at the end."
            )}
          </p>
        </div>
      </div>

      {/* Find Partner Button */}
      <div className="mt-8 flex justify-center">
        <Button
          variant="primary"
          onClick={handleFindPartner}
          disabled={!isFormValid || isSubmitting}
        >
          <span className="flex items-center justify-center sm:text-xl md:text-2xl font-semibold px-8 py-2">
            <Search className="mr-2 h-7 w-7" />
            {isSubmitting
              ? t("start.connecting", "Connecting...")
              : t("start.findPartner", "Find Partner")}
          </span>
        </Button>
      </div>

      {/* Form Validation Message */}
      {!isFormValid && (
        <p
          className="text-center text-sm mt-4"
          style={{ color: "var(--text-tertiary)" }}
        >
          {t(
            "start.validation",
            "Please describe what you'll work on to continue"
          )}
        </p>
      )}
    </div>
  );
};

export default StartPage;
