import React, { useState, useEffect } from "react";
import { User, Star } from "lucide-react";
import StatusDot from "./StatusDot";
import SessionProgressRing from "./SessionProgressRing";
import { useTranslation } from "react-i18next";

interface PartnerProfileCardProps {
  name: string;
  avatarUrl?: string;
  studyGoal: string;
  reputationScore: number; // 0-5
  completionRate: number; // 0-100
  status: "active" | "idle" | "disconnected" | "waiting";
  sessionProgress?: number; // 0-100, optional for showing timer
  showBreathingEffect?: boolean;
  className?: string;
}

const PartnerProfileCard: React.FC<PartnerProfileCardProps> = ({
  name,
  avatarUrl,
  studyGoal,
  reputationScore,
  completionRate,
  status,
  sessionProgress,
  showBreathingEffect = true,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const statusText = {
    active: t("partnerProfile.status.active", "Working"),
    idle: t("partnerProfile.status.idle", "Idle"),
    disconnected: t("partnerProfile.status.disconnected", "Disconnected"),
    waiting: t("partnerProfile.status.waiting", "Waiting"),
  };

  const statusColor = {
    active: "var(--success)",
    idle: "var(--warning)",
    disconnected: "var(--danger)",
    waiting: "var(--text-tertiary)",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center transition-all duration-700 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      } ${className}`}
    >
      {/* Profile Container with Progress Ring */}
      <div className="mt-4">
        {/* Session Progress Ring (if provided) */}
        {/* {sessionProgress !== undefined && (
          <div className="absolute inset-0 flex items-center justify-center">
            <SessionProgressRing
              progress={sessionProgress}
              size={220}
              strokeWidth={6}
            />
          </div>
        )} */}

        {/* Profile Circle with Breathing Effect */}
        <div
          className={`relative ${
            showBreathingEffect && status === "active"
              ? "breathing-profile"
              : ""
          }`}
        >
          {/* Avatar Container */}
          <div
            className="w-48 h-48 rounded-full border-4 flex items-center justify-center"
            style={{
              borderColor: "var(--border-secondary)",
              backgroundColor: "var(--bg-tertiary)",
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User
                className="w-24 h-24"
                style={{ color: "var(--text-tertiary)" }}
              />
            )}
          </div>

          {/* Status Dot */}
          <div className="absolute bottom-2 right-2 bg-[var(--bg-primary)] rounded-full p-1">
            <StatusDot
              status={status}
              size="lg"
              withPulse={status === "active"}
            />
          </div>
        </div>
      </div>

      {/* Partner Info */}
      <div className="mt-6 text-center space-y-3 max-w-md">
        {/* Name */}
        <h2
          className="text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {name}
        </h2>

        {/* Status */}
        <p
          className="text-sm font-medium"
          style={{ color: statusColor[status] }}
        >
          {statusText[status]}
        </p>

        {/* Study Goal */}
        <div
          className="rounded-lg p-4 mx-4"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderLeft: "3px solid var(--accent)",
          }}
        >
          <p
            className="text-sm font-medium mb-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("partnerProfile.workingOn", "Working on:")}
          </p>
          <p className="text-base" style={{ color: "var(--text-primary)" }}>
            {studyGoal}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-6 mt-4">
          {/* Reputation Score */}
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            <span
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {reputationScore.toFixed(1)}
            </span>
          </div>

          {/* Divider */}
          <div
            className="w-px h-6"
            style={{ backgroundColor: "var(--border-primary)" }}
          />

          {/* Completion Rate */}
          <div className="text-center">
            <p
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {completionRate}%
            </p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {t("partnerProfile.completion", "completion")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfileCard;
