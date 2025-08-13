import type { LoginCredentials, RegisterCredentials } from "@/types/auth";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function validateLoginCredentials(
    credentials: LoginCredentials
): string {
    const { email, password } = credentials;

    // Email must have a valid format
    if (!EMAIL_REGEXP.test(email)) {
        return "Please enter a valid email address";
    }

    // Password must match security rules
    if (password.length < 8 || email.includes(password)) {
        return "Password must be 8 chars, and not part of email";
    }

    // Credentials are valid
    return "";
}

export function validateRegisterCredentials(credentials: RegisterCredentials) {
    const { email, password, confirmPassword } = credentials;

    // Email must have a valid format
    if (!EMAIL_REGEXP.test(email)) {
        return "Please enter a valid email address";
    }

    // Password must match security rules
    if (password.length < 8 || email.includes(password)) {
        return "Password must be 8 chars, and not part of email";
    }

    // Password must match confirm password
    if (password !== confirmPassword) {
        return "Password do not match confirm password";
    }

    // Credentials are valid
    return "";
}
