import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { validateLoginCredentials } from "@auth/helpers/validation";
import type { LoginCredentials } from "@auth/types/credentials";

const initialCredentials: LoginCredentials = {
    email: "",
    password: "",
};

export const useLogin = () => {
    const [credentials, setCredentials] =
        useState<LoginCredentials>(initialCredentials);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [redirection, setRedirection] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setError("");

        // Input fix during redirection.
        if (success) return;

        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Check credentials before calling Auth-API.
        const errorCheck = validateLoginCredentials(credentials);
        if (errorCheck) {
            setError(errorCheck);
            return;
        }
        setRedirection(true);

        // Call Auth API.
        // for demenstrating purpeses.                setSuccess("Login Successfully, Redirection ...");

        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                setError("");
                setSuccess("Login Successfully, Redirection ...");
                setCredentials({ email: "", password: "" });
                setTimeout(() => navigate("/dashboard"), 1000);
            } else {
                setError("Email or password are not valide");
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
};
