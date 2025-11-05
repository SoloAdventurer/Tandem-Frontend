import { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import Modal from "./components/Modal";
import Badge from "./components/Badge";
import Timer from "./components/Timer";

import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const [taskName, setTaskName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Language Switcher */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900">
            {t("common.welcome")}
          </h1>
          <LanguageSwitcher />
        </div>

        {/* Timer */}
        <Card>
          <h2 className="text-2xl font-bold mb-4 text-neutral-900">
            {t("timer.title")}
          </h2>
          <Timer
            duration={1800}
            onComplete={() => alert(t("timer.complete"))}
          />
        </Card>

        {/* Badges */}
        <Card>
          <h2 className="text-neutral-900 text-2xl font-bold mb-4">
            {t("badges.title")}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">{t("badges.level", { level: 5 })}</Badge>
            <Badge variant="success">{t("badges.active")}</Badge>
            <Badge variant="warning">{t("badges.break")}</Badge>
            <Badge variant="danger">{t("badges.incomplete")}</Badge>
            <Badge variant="info">{t("badges.newFeature")}</Badge>
            <Badge variant="success" size="sm">
              {t("badges.small")}
            </Badge>
            <Badge variant="success" size="lg">
              {t("badges.large")}
            </Badge>
          </div>
        </Card>

        {/* Modal Demo */}
        <Card>
          <h2 className="text-2xl font-bold mb-4 text-neutral-900">
            {t("modal.title")}
          </h2>
          <Button onClick={() => setIsModalOpen(true)}>
            {t("modal.openButton")}
          </Button>
        </Card>

        {/* Input Examples */}
        <Card>
          <h2 className="text-2xl font-bold mb-4 text-neutral-900">
            {t("input.title")}
          </h2>
          <div className="space-y-4">
            <Input
              label={t("input.taskLabel")}
              placeholder={t("input.taskPlaceholder")}
              value={taskName}
              onChange={setTaskName}
              required
            />
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("modal.checkInTitle")}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-neutral-600">{t("modal.checkInMessage")}</p>
          <Input
            label={t("modal.completedLabel")}
            placeholder={t("modal.completedPlaceholder")}
            value=""
            onChange={() => {}}
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              {t("common.submit")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
