import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import {
  type SignupFieldErrors,
  validateSignUpForm,
} from "../../validation/SignupValidation";
import { authClient, useSession } from "../../lib/auth-client";

interface SignUpPageProps {
  onNavigate: (page: "home" | "login" | "signup") => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { refetch: refetchSession } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    handleSignUp();
  };

  const handleSignUp = async () => {
    if (loading) return;

    setSuccessMessage("");
    setFormErrors([]);
    setFieldErrors({});

    const validation = validateSignUpForm(
      name,
      email,
      password,
      confirmPassword
    );
    if (!validation.isValid) {
      setFieldErrors(validation.fieldErrors);
      setFormErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      // Use Better Auth client
      const { error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (authError) {
        throw new Error(
          authError.message ||
            t("auth.messages.genericError", "Something went wrong. Please try again."),
        );
      }

      await refetchSession();

      setFieldErrors({});
      setFormErrors([]);
      setSuccessMessage(
        t("auth.signup.successHint", "Account created! Redirecting..."),
      );

      window.setTimeout(() => {
        onNavigate("home");
      }, 600);
    } catch (err) {
      if (err instanceof Error) {
        setFormErrors([err.message]);
      } else {
        setFormErrors([
          t("auth.messages.genericError", "Something went wrong. Please try again."),
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
          {t("auth.signup.title", "Create Account")}
        </h1>
        <p
          className="text-center mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {t("auth.signup.subtitle", "Join Tandem and find your study partner")}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              style={getInputStyles(Boolean(fieldErrors.name))}
              aria-invalid={Boolean(fieldErrors.name)}
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm" style={{ color: "var(--danger)" }}>
                {fieldErrors.name}
              </p>
            )}
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
              style={getInputStyles(Boolean(fieldErrors.confirmPassword))}
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
            />
            {fieldErrors.confirmPassword && (
              <p className="mt-1 text-sm" style={{ color: "var(--danger)" }}>
                {fieldErrors.confirmPassword}
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
                ? t("auth.signingUp", "Signing up...")
                : t("auth.signup.button", "Sign Up")}
            </Button>
          </div>
        </form>

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
