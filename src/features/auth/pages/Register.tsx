import { Header } from "@components/layouts/Header";
import Cat from "@assets/Cat.jpg";

import RegisterForm from "@auth/components/RegisterForm";

export default function Register() {
    return (
        <div>
            <Header />
            <div className="grid min-h-svh max-h-screen lg:grid-cols-2 overflow-x-hidden">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${Cat})`, backgroundPositionY: "20px"}}
                ></div>
                <RegisterForm />
            </div>
        </div>
    );
}
