import React, { useEffect } from "react";
import { ThemeProvider, useTheme } from "./providers/ThemeProvider";
import { useTranslation } from "react-i18next";

import BackgroundCanvas from "./components/profile/BackgroundCanvas";
import BottomNav from "./components/navigation/BottomNav";
import ProfilePage from "./pages/Profile";
import HomePage from "./pages/HomePage";
import StartPage from "./pages/StartPage";
import SignUpPage from "./components/auth/SignUpPage";

function AppContent() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = React.useState<
    "home" | "analytics" | "start" | "session" | "profile" | "login" | "signup"
  >("signup"); // Start with signup page
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);

  return (
    <>
      {/* Only show BottomNav when not on auth pages */}
      {currentPage !== "signup" && currentPage !== "login" && (
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      )}

      <BackgroundCanvas theme={theme} />

      <div className="page-transition">
        {currentPage === "signup" && <SignUpPage onNavigate={setCurrentPage} />}
        {currentPage === "login" && <div>Login Page (Coming Soon)</div>}
        {currentPage === "profile" && <ProfilePage />}
        {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === "analytics" && <div>Analytics Page (Coming Soon)</div>}
        {currentPage === "start" && <StartPage onNavigate={setCurrentPage} />}
        {currentPage === "session" && <div>Session Page (Coming Soon)</div>}
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
