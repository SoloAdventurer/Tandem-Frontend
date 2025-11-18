const MIN_NAME_LENGTH = 2;

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

export const isValidPassword = (password: string): boolean => {
  return PASSWORD_REQUIREMENTS.pattern.test(password);
};

export const doPasswordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= MIN_NAME_LENGTH;
};

export type SignupFieldErrors = Partial<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

export type LoginFieldErrors = Partial<{
  email: string;
  password: string;
}>;

export const validateSignUpForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): { isValid: boolean; errors: string[]; fieldErrors: SignupFieldErrors } => {
  const errors: string[] = [];
  const fieldErrors: SignupFieldErrors = {};

  if (!isValidName(name)) {
    const message = "Name must be at least 2 characters";
    errors.push(message);
    fieldErrors.name = message;
  }

  if (!isValidEmail(email)) {
    const message = "Invalid email address";
    errors.push(message);
    fieldErrors.email = message;
  }

  if (!isValidPassword(password)) {
    const message =
      "Password must be 8+ characters with upper, lower, and a number";
    errors.push(message);
    fieldErrors.password = message;
  }

  if (!doPasswordsMatch(password, confirmPassword)) {
    const message = "Passwords do not match";
    errors.push(message);
    fieldErrors.confirmPassword = message;
  }

  return {
    isValid: errors.length === 0,
    errors,
    fieldErrors,
  };
};

export const validateLoginForm = (
  email: string,
  password: string,
): { isValid: boolean; errors: string[]; fieldErrors: LoginFieldErrors } => {
  const errors: string[] = [];
  const fieldErrors: LoginFieldErrors = {};

  if (!isValidEmail(email)) {
    const message = "Email or password incorrect";
    errors.push(message);
    fieldErrors.email = message;
  }

  if (!isValidPassword(password)) {
    const message =
      "Password must be 8+ characters with upper, lower, and a number";
    errors.push(message);
    fieldErrors.password = message;
  }

  return {
    isValid: errors.length === 0,
    errors,
    fieldErrors,
  };
};
