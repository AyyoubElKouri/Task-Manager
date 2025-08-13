import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";

const Logo = () => {
    return (
        <Link to={"/"}>
            <img src={logo} alt="Logo" className="w-8 h-8" />
        </Link>
    );
};

export default Logo;
