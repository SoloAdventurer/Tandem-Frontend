import { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import Modal from "./components/Modal";
import Badge from "./components/Badge";
import Timer from "./components/Timer";

function App() {
  const [taskName, setTaskName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Timer */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Timer</h2>
          <Timer
            duration={1800} // 30 minutes
            onComplete={() => alert("Time is up!")}
          />
        </Card>

        {/* Badges */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Level 5</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Break</Badge>
            <Badge variant="danger">Incomplete</Badge>
            <Badge variant="info">New Feature</Badge>
            <Badge variant="success" size="sm">
              Small
            </Badge>
            <Badge variant="success" size="lg">
              Large
            </Badge>
          </div>
        </Card>

        {/* Modal Demo */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Modal</h2>
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        </Card>

        {/* Input Examples */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Input Fields</h2>
          <div className="space-y-4">
            <Input
              label="Task Name"
              placeholder="What are you working on?"
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
        title="Check-in Time!"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Show your partner what you've accomplished!
          </p>
          <Input
            label="What did you complete?"
            placeholder="Describe your progress..."
            value=""
            onChange={() => {}}
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
