import { Header } from "@components/layouts/Header";

import RegisterForm from "@auth/components/RegisterForm";

export default function Register() {
    return (
        <div>
            <Header />
            <div className="grid min-h-svh lg:grid-cols-2">
                <h1 className="text-white">Hell</h1>
                <RegisterForm />
            </div>
        </div>
    );
}
