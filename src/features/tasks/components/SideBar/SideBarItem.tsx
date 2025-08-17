import type { MenuItem } from "./menu-items";

export function SideBarItem({
    label,
    icon,
    route,
    activeRoute,
    changeRoute,
    isOpen,
}: MenuItem & {
    activeRoute: string;
    changeRoute: (route: string) => void;
    isOpen: boolean;
}) {
    const isActive = activeRoute.includes(route);

    return (
        <div
            className={`w-full h-10 flex items-center px-2 gap-2 rounded-md cursor-pointer transition-all duration-200 ${
                isActive
                    ? "bg-primary-400 text-black"
                    : "bg-surface-dark-5 text-text-primary"
            }`}
            onClick={() => changeRoute(route)}
        >
            <img src={icon} alt={label} className="w-5 h-5" />

            {isOpen && (
                <span className="whitespace-nowrap overflow-hidden">
                    {label}
                </span>
            )}
        </div>
    );
}
