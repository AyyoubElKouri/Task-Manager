import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { validateRegisterCredentials } from "@auth/helpers/validation";
import type { RegisterCredentials } from "@auth/types/credentials";

export function useRegister() {
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [redirection, setRedirection] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setError("");
        setSuccess("");
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Check credentials before calling Auth-API.
        const errorCheck = validateRegisterCredentials(credentials);
        if (errorCheck) {
            setError(errorCheck);
            return;
        }
        setRedirection(true);

        // Call Auth API.
        // for demenstrating purpeses.
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                setError("");
                setSuccess("Registered successfully. Redirecting to login...");
                setCredentials({
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setTimeout(() => navigate("/login"), 1000);
            } else {
                setError("Email already exists!");
            }

            setRedirection(false);
        }, 2000);
    }

    const handlers = {
        handleChange,
        handleSubmit,
    };

    const messages = {
        error,
        success,
    };

    return {
        handlers,
        credentials,
        messages,
        redirection,
    };
}
