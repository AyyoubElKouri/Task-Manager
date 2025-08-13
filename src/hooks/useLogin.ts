import { validateLoginCredentials } from "@/helpers/validation";
import type { LoginCredentials } from "@/types/auth";
import {
    useLayoutEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [redirection, setRedirection] = useState<boolean>(false);

    const navigator = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        setError("");
        setSuccess("");
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
        // for demenstrating purpeses.
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                setError("");
                setSuccess("Login Successfuly, Redirection ...");
                setCredentials({ email: "", password: "" });
                navigator("/dashboard");
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

export const useLoginAnimation = () => {
    const formReference = useRef<HTMLFormElement>(null);
    const [messageStart, setMessageStart] = useState<number>(0);

    useLayoutEffect(() => {
        function updatePosition() {
            if (formReference.current) {
                const rect = formReference.current.getBoundingClientRect();
                const absoluteY = rect.top + window.scrollY;
                setMessageStart(absoluteY);
            }
        }
        updatePosition();

        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("resize", updatePosition);
        };
    }, []);

    return {
        formReference,
        messageStart,
        setMessageStart,
    };
};
