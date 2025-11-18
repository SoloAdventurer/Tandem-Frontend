import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { signIn, useSession } from "../../lib/auth-client";
import {
  type LoginFieldErrors,
  validateLoginForm,
} from "../../validation/SignupValidation";

interface LoginPageProps {
  onNavigate: (page: "home" | "login" | "signup") => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { refetch: refetchSession } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    handleLogin();
  };

  const handleLogin = async () => {
    if (loading) return;

    setSuccessMessage("");
    setFormErrors([]);
    setFieldErrors({});

    const validation = validateLoginForm(email, password);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setFieldErrors(validation.fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(
          error.message ||
            t("auth.messages.invalidCredentials", "Email or password incorrect"),
        );
      }

      await refetchSession();

      setFormErrors([]);
      setFieldErrors({});
      setSuccessMessage(
        t("auth.login.successHint", "Welcome back! Redirecting..."),
      );

      window.setTimeout(() => {
        onNavigate("home");
      }, 600);
    } catch (err) {
      if (err instanceof Error) {
        setFormErrors([err.message]);
      } else {
        setFormErrors([
          t("auth.messages.invalidCredentials", "Email or password incorrect"),
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getInputStyles = (hasError: boolean) => ({
    backgroundColor: "var(--bg-tertiary)",
    borderColor: hasError ? "var(--danger)" : "var(--border-primary)",
    color: "var(--text-primary)",
  });

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
          {t("auth.login.title", "Welcome back")}
        </h1>
        <p
          className="text-center mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {t("auth.login.subtitle", "Sign in to continue your study streak")}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              style={getInputStyles(Boolean(fieldErrors.email))}
              aria-invalid={Boolean(fieldErrors.email)}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm" style={{ color: "var(--danger)" }}>
                {fieldErrors.email}
              </p>
            )}
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
              style={getInputStyles(Boolean(fieldErrors.password))}
              aria-invalid={Boolean(fieldErrors.password)}
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm" style={{ color: "var(--danger)" }}>
                {fieldErrors.password}
              </p>
            )}
          </div>

          {successMessage && (
            <div
              className="rounded-lg p-3 text-sm"
              style={{
                backgroundColor: "var(--success-bg, #dcfce7)",
                color: "var(--success, #15803d)",
                border: "1px solid var(--success-border, #86efac)",
              }}
              aria-live="polite"
            >
              {successMessage}
            </div>
          )}

          {formErrors.length > 0 && (
            <div
              className="rounded-lg p-3 text-sm space-y-1"
              style={{
                backgroundColor: "var(--danger-bg)",
                color: "var(--danger)",
              }}
              aria-live="assertive"
            >
              {formErrors.map((message) => (
                <p key={message}>{message}</p>
              ))}
            </div>
          )}

          <div className="text-center mt-6">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading
                ? t("auth.loggingIn", "Signing in...")
                : t("auth.login.button", "Sign In")}
            </Button>
          </div>
        </form>

        <p
          className="text-center text-sm mt-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {t("auth.login.noAccount", "Need an account?")}{" "}
          <button
            onClick={() => onNavigate("signup")}
            className="font-medium hover:underline"
            style={{ color: "var(--accent)" }}
          >
            {t("auth.signup.button", "Sign Up")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

