export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const doPasswordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const isValidName = (name: string): boolean => {
  return name.trim().length > 0;
};

export const validateSignUpForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidName(name)) {
    errors.push("Name is required");
  }

  if (!isValidEmail(email)) {
    errors.push("Invalid email address");
  }

  if (!isValidPassword(password)) {
    errors.push("Password must be at least 8 characters");
  }

  if (!doPasswordsMatch(password, confirmPassword)) {
    errors.push("Passwords do not match");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateLoginForm = (
  email: string,
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isValidEmail(email)) {
    errors.push("Invalid email address");
  }

  if (!isValidPassword(password)) {
    errors.push("Password must be at least 8 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
