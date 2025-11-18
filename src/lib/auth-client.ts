import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth", // backend auth URL
});

// Export commonly used methods for convenience
export const { signUp, signIn, signOut, useSession } = authClient;
