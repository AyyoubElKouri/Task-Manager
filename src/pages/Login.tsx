import LoginForm from "@/components/auth/LoginForm";
import HomeHeader from "@/components/layouts/Header";

export default function LoginPage() {
    return (
        <div>
            <HomeHeader />
            <div className="grid min-h-svh lg:grid-cols-2">
                <LoginForm />
                <h1 className="text-white">Hell</h1>
            </div>
        </div>
    );
}
