import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Spinner from "../ui/Spinner";
import { useLoginAnimation, useLoginForm } from "@/hooks/useLogin";
import { FormAlertBanner } from "../ui/FormAlertBanner";

const LoginForm = () => {
    const { handlers, credentials, messages, redirection } = useLoginForm();
    const { formReference, messageStart } = useLoginAnimation();

    return (
        <div className="bg-surface-dark-2 flex flex-col justify-center items-center">
            {messages.error && (
                <AnimatePresence>
                    <FormAlertBanner
                        type="error"
                        message={messages.error}
                        errorStartY={messageStart}
                    />
                </AnimatePresence>
            )}

            {messages.success && (
                <AnimatePresence>
                    <FormAlertBanner
                        type="success"
                        message={messages.success}
                        errorStartY={messageStart}
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
                    <h1 className="text-text-primary text-2xl">Login</h1>
                    <p className="text-text-secondary">
                        Welcome to Zendo, login to your account
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
                    <div className="flex justify-between">
                        <Label className="text-text-primary" htmlFor="password">
                            Password
                        </Label>
                        <Link
                            to={"/forgot-password"}
                            className="text-sm font-medium text-text-secondary hover:text-primary-700"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        name="password"
                        className="text-text-secondary border-text-disabled"
                        type="password"
                        value={credentials.password}
                        onChange={handlers.handleChange}
                    />
                </div>

                {/* === Action buttons === */}
                <div className="w-fill flex justify-between">
                    <Button
                        className="bg-surface-dark-4 text-white w-34"
                        type="button"
                    >
                        Register
                    </Button>
                    <Button
                        className="bg-primary-700 text-white w-34"
                        type="submit"
                    >
                        {redirection ? <Spinner /> : "Login"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
