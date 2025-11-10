import { ThemeProvider, useTheme } from "./providers/ThemeProvider";
import SettingsPage from "./pages/Settings";
import BackgroundCanvas from "./components/BackgroundCanvas";

/**
 * Inner component that has access to theme context
 * We need this because BackgroundCanvas needs the current theme
 */
function AppContent() {
  const { theme } = useTheme();

  return (
    <>
      {/** Starry background - sits behind everything */}
      <BackgroundCanvas theme={theme} />

      {/** Your settings page on top */}
      <SettingsPage />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
