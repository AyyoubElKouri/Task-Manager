import { Header } from "@components/layouts/Header";

import LoginForm from "@auth/components/LoginForm";

export default function Login() {
    return (
        <div>
            <Header />
            <div className="grid min-h-svh lg:grid-cols-2">
                <LoginForm />
                <h1 className="text-white">Hell</h1>
            </div>
        </div>
    );
}
