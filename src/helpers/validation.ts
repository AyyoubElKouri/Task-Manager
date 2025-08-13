import type { LoginCredentials } from "@/types/auth";

export function validateLoginCredentials(
    credentials: LoginCredentials
): string {
    const { email, password } = credentials;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    // Email must have a valid format
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }

    // Password must match security rules
    if (password.length < 8 || email.includes(password)) {
        return "Password must be 8 chars, and not part of email";
    }

    // Credentials are valid
    return "";
}
