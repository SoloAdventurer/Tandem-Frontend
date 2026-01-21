import React from "react";
import { Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MultiGoalInputProps {
  goals: string[];
  onChange: (goals: string[]) => void;
  maxGoals?: number;
  maxLength?: number;
}

const MultiGoalInput: React.FC<MultiGoalInputProps> = ({
  goals,
  onChange,
  maxGoals = 3,
  maxLength = 150,
}) => {
  const { t } = useTranslation();

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    onChange(newGoals);
  };

  const addGoal = () => {
    if (goals.length < maxGoals) {
      onChange([...goals, ""]);
    }
  };

  const removeGoal = (index: number) => {
    if (goals.length > 1) {
      const newGoals = goals.filter((_, i) => i !== index);
      onChange(newGoals);
    }
  };

  return (
    <div>
      <label
        className="block text-sm font-medium mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        {t("start.goal.label", "What will you work on?")}
        <span style={{ color: "var(--danger)" }}> *</span>
      </label>

      <div className="space-y-3">
        {goals.map((goal, index) => (
          <div key={index} className="relative">
            <div className="flex gap-2">
              <textarea
                value={goal}
                onChange={(e) => handleGoalChange(index, e.target.value)}
                placeholder={t(
                  "start.goal.placeholder",
                  `Goal ${index + 1}: e.g., Study for Biology midterm`
                )}
                maxLength={maxLength}
                rows={2}
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors resize-none"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  borderColor: "var(--border-primary)",
                  color: "var(--text-primary)",
                }}
              />

              {/* Remove button (only show if more than 1 goal) */}
              {goals.length > 1 && (
                <button
                  onClick={() => removeGoal(index)}
                  className="p-3 rounded-lg border transition-all hover:scale-105"
                  style={{
                    backgroundColor: "var(--danger-bg)",
                    borderColor: "var(--danger)",
                    color: "var(--danger)",
                  }}
                  aria-label="Remove goal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Add button (only show on last goal if under max) */}
              {index === goals.length - 1 && goals.length < maxGoals && (
                <button
                  onClick={addGoal}
                  className="p-3 rounded-lg border transition-all hover:scale-105"
                  style={{
                    backgroundColor: "var(--success-bg)",
                    borderColor: "var(--success)",
                    color: "var(--success)",
                  }}
                  aria-label="Add goal"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>

            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              {goal.length}/{maxLength}{" "}
              {t("start.goal.characters", "characters")}
            </p>
          </div>
        ))}
      </div>

      {/* Info text */}
      <p className="text-xs mt-3" style={{ color: "var(--text-secondary)" }}>
        💡{" "}
        {t(
          "start.goal.tip",
          "Add up to 3 goals to stay organized during your session"
        )}
      </p>
    </div>
  );
};

export default MultiGoalInput;
