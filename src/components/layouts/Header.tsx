import { Link } from "react-router-dom";
import Logo from "../ui/Logo";

const NAV_LINKS = {
    features: "Features",
    news: "News",
    links: "Links",
    about: "About",
    contact: "Contact",
    login: "Login",
};

export const Header = () => {
    return (
        <header className="w-full h-12 px-50 bg-surface-dark-3 text-text-primary flex items-center justify-between">
            <Logo />
            <div className="flex gap-10">
                <Link to={"/dashboard"} className="hover:text-primary-700">
                    {" "}
                    {NAV_LINKS.features}{" "}
                </Link>

                <Link to={"/dashboard"} className="hover:text-primary-700">
                    {" "}
                    {NAV_LINKS.news}{" "}
                </Link>

                <Link to={"/dashboard"} className="hover:text-primary-700">
                    {" "}
                    {NAV_LINKS.links}{" "}
                </Link>

                <Link to={"/dashboard"} className="hover:text-primary-700">
                    {" "}
                    {NAV_LINKS.about}{" "}
                </Link>

                <Link to={"/dashboard"} className="hover:text-primary-700">
                    {" "}
                    {NAV_LINKS.contact}{" "}
                </Link>

                <Link to={"/login"} className="hover:text-primary-700">
                    {" "}
                    {NAV_LINKS.login}{" "}
                </Link>
            </div>
        </header>
    );
};

