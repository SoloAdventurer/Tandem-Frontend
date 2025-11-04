import Button from "./components/Button";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center gap-4">
      <Button variant="primary" onClick={() => alert("Primary!")}>
        Primary Button
      </Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="danger">Danger Button</Button>
    </div>
  );
}

export default App;
