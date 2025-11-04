import Button from "./components/Button";
import Card from "./components/Card";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Buttons Section */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Buttons</h2>
          <div className="flex gap-4">
            <Button variant="primary" onClick={() => alert("Primary!")}>
              Primary Button
            </Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button</Button>
          </div>
        </Card>

        {/* Session Card Example */}
        <Card hover onClick={() => alert("Session clicked!")}>
          <h3 className="text-xl font-semibold mb-2">Active Session</h3>
          <p className="text-gray-600">
            Working with Partner • 45 min remaining
          </p>
        </Card>

        {/* Task Card Example */}
        <Card hover>
          <h3 className="text-lg font-semibold mb-2">Complete Assignment</h3>
          <p className="text-sm text-gray-500">Estimated: 2 hours</p>
        </Card>
      </div>
    </div>
  );
}

export default App;
