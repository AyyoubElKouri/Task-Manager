import RegisterForm from "@/components/auth/RegisterForm";
import HomeHeader from "@/components/layouts/Header";

export default function Register() {
    return (
        <div>
            <HomeHeader />
            <div className="grid min-h-svh lg:grid-cols-2">
                <h1 className="text-white">Hell</h1>
                <RegisterForm />
            </div>
        </div>
    );
}
