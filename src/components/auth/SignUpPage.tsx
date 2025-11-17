import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { validateSignUpForm } from "../../validation/SignupValidation";
import { authClient } from "../../lib/auth-client";

interface SignUpPageProps {
  onNavigate: (page: "home" | "login" | "signup") => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");

    const validation = validateSignUpForm(
      name,
      email,
      password,
      confirmPassword
    );
    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }

    setLoading(true);

    try {
      // Use Better Auth client
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (authError) {
        throw new Error(authError.message || "Sign up failed");
      }

      console.log("Sign up successful:", data);
      onNavigate("home");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-lg"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h1
          className="text-3xl font-bold text-center mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {t("auth.signup.title", "Create Account")}
        </h1>
        <p
          className="text-center mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {t("auth.signup.subtitle", "Join Tandem and find your study partner")}
        </p>

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {t("auth.name", "Name")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("auth.namePlaceholder", "Enter your name")}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {t("auth.email", "Email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder", "your@university.edu")}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {t("auth.password", "Password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t(
                "auth.passwordPlaceholder",
                "At least 8 characters"
              )}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {t("auth.confirmPassword", "Confirm Password")}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t(
                "auth.confirmPasswordPlaceholder",
                "Re-enter password"
              )}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {error && (
            <div
              className="rounded-lg p-3 text-sm"
              style={{
                backgroundColor: "var(--danger-bg)",
                color: "var(--danger)",
              }}
            >
              {error}
            </div>
          )}

          <div className="text-center mt-6">
            <Button variant="primary" onClick={handleSignUp} disabled={loading}>
              {loading
                ? t("auth.signingUp", "Signing up...")
                : t("auth.signup.button", "Sign Up")}
            </Button>
          </div>
        </div>

        <p
          className="text-center text-sm mt-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {t("auth.signup.haveAccount", "Already have an account?")}{" "}
          <button
            onClick={() => onNavigate("login")}
            className="font-medium hover:underline"
            style={{ color: "var(--accent)" }}
          >
            {t("auth.login.button", "Log In")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
