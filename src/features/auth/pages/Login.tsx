import { Header } from "@components/layouts/Header";
import Cat2 from "@assets/Cat2.jpg";

import LoginForm from "@auth/components/LoginForm";

export default function Login() {
    return (
        <div>
            <Header />
            <div className="grid min-h-svh lg:grid-cols-2">
                <LoginForm />
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${Cat2})`,
                    }}
                ></div>
            </div>
        </div>
    );
}
