import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SideBarOpen } from "./SideBarOpen";
import { SideBarClosed } from "./SideBarClosed";

// Helper: return last segment of pathname with leading slash
function getLastPathSegment(pathname: string): string {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "/";
    return "/" + segments.at(-1)!;
}

export const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const path = getLastPathSegment(location.pathname);

    const toggleSideBar = () => setIsOpen(!isOpen);
    const changeRoute = (route: string) => navigate(route);

    return isOpen ? (
        <SideBarOpen
            toggleSideBar={toggleSideBar}
            path={path}
            changeRoute={changeRoute}
            isOpen={isOpen}
        />
    ) : (
        <SideBarClosed
            toggleSideBar={toggleSideBar}
            path={path}
            changeRoute={changeRoute}
            isOpen={isOpen}
        />
    );
};
