import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Spinner } from "@components/ui/Spinner";

import { useFormAnimation } from "@auth/hooks/useFormAnimation";
import { FormAlertBanner } from "@auth/components/FormAlertBanner";
import { useRegister } from "@auth/hooks/useRegister";

const RegisterForm = () => {
    const { handlers, credentials, messages, redirection } = useRegister();
    const { formReference, messageStart } = useFormAnimation();
    const navigate = useNavigate();

    return (
        <div className="bg-surface-dark-2 flex flex-col justify-center items-center">
            {messages.error && (
                <AnimatePresence>
                    <FormAlertBanner
                        type="error"
                        message={messages.error}
                        startYPosition={messageStart}
                    />
                </AnimatePresence>
            )}

            {messages.success && (
                <AnimatePresence>
                    <FormAlertBanner
                        type="success"
                        message={messages.success}
                        startYPosition={messageStart}
                    />
                </AnimatePresence>
            )}

            <form
                className="-mt-2 z-20 bg-surface-dark-3 rounded-lg shadow-sm w-90 p-8 flex flex-col gap-6"
                onSubmit={handlers.handleSubmit}
                ref={formReference}
                noValidate
            >
                {/* === Header === */}
                <header className="flex flex-col items-center">
                    <h1 className="text-text-primary text-2xl">Register</h1>
                    <p className="text-text-secondary">
                        Welcome to Zendo, create new account
                    </p>
                </header>

                {/* === Email === */}
                <div className="flex flex-col gap-2">
                    <Label className="text-text-primary" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        className="text-text-secondary border-text-disabled"
                        type="email"
                        value={credentials.email}
                        onChange={handlers.handleChange}
                    />
                </div>

                {/* === Password === */}
                <div className="flex flex-col gap-2">
                    <Label className="text-text-primary" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        className="text-text-secondary border-text-disabled"
                        type="password"
                        value={credentials.password}
                        onChange={handlers.handleChange}
                    />
                </div>

                {/* === Confirm Password === */}
                <div className="flex flex-col gap-2">
                    <Label
                        className="text-text-primary"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        className="text-text-secondary border-text-disabled"
                        type="password"
                        value={credentials.confirmPassword}
                        onChange={handlers.handleChange}
                    />
                </div>

                {/* === Action buttons === */}
                <div className="w-fill flex justify-between">
                    <Button
                        className="bg-surface-dark-4 text-white w-34"
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                    <Button
                        className="bg-primary-700 text-white w-34"
                        type="submit"
                    >
                        {redirection ? <Spinner /> : "Register"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
