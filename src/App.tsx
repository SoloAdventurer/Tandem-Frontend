import React from "react";
import { ThemeProvider, useTheme } from "./providers/ThemeProvider";
import BackgroundCanvas from "./components/BackgroundCanvas";
import BottomNav from "./components/navigation/BottomNav";
import ProfilePage from "./pages/Profile";

/**
 * Inner component that has access to theme context
 * We need this because BackgroundCanvas needs the current theme
 */
function AppContent() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = React.useState<
    "home" | "analytics" | "start" | "solo" | "profile"
  >("home");

  return (
    <>
      {/** Bottom Navigation */}
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />

      {/** Starry background - sits behind everything */}
      <BackgroundCanvas theme={theme} />

      {/** Page content with smooth transitions */}
      <div className="page-transition">
        {currentPage === "profile" && <ProfilePage />}
        {currentPage === "home" && <div>Home Page (Coming Soon)</div>}
        {currentPage === "analytics" && <div>Analytics Page (Coming Soon)</div>}
        {currentPage === "start" && <div>Start Page (Coming Soon)</div>}
        {currentPage === "solo" && <div>Solo Page (Coming Soon)</div>}
      </div>
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
