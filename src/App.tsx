import React, { useEffect } from "react";
import { ThemeProvider, useTheme } from "./providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { useSession } from "./lib/auth-client";

import BackgroundCanvas from "./components/profile/BackgroundCanvas";
import BottomNav from "./components/navigation/BottomNav";
import ProfilePage from "./pages/Profile";
import HomePage from "./pages/HomePage";
import StartPage from "./pages/StartPage";
import SignUpPage from "./components/auth/SignUpPage";
import LoginPage from "./components/auth/LoginPage";
import AnalyticsPage from "./pages/Analytics";

function AppContent() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = React.useState<
    "home" | "analytics" | "start" | "session" | "profile" | "login" | "signup"
  >("signup"); // Start with signup page
  const { i18n } = useTranslation();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;
    if (session) {
      setCurrentPage("home");
    } else {
      // If no session, we can stay on signup or redirect to login/signup
      // For now, we'll keep the default "signup" if they are on a protected route,
      // but if we want to be smarter we could check the current page.
      // Since currentPage defaults to "signup", we are good.
    }
  }, [session, isPending]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);

  return (
    <>
      {isPending ? (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
          Loading...
        </div>
      ) : (
        <>
          {/* Only show BottomNav when not on auth pages */}
          {currentPage !== "signup" && currentPage !== "login" && (
            <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
          )}

          <BackgroundCanvas theme={theme} />

          <div className="page-transition">
            {currentPage === "signup" && <SignUpPage onNavigate={setCurrentPage} />}
            {currentPage === "login" && <LoginPage onNavigate={setCurrentPage} />}
            {currentPage === "profile" && <ProfilePage onNavigate={setCurrentPage} />}
            {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
            {currentPage === "analytics" && (
              <AnalyticsPage onNavigate={setCurrentPage} />
            )}
            {currentPage === "start" && <StartPage onNavigate={setCurrentPage} />}
            {currentPage === "session" && <div>Session Page (Coming Soon)</div>}
          </div>
        </>
      )}
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
