import { Button } from "@components/ui/Button";
import { ArrowLeftToLine } from "lucide-react";
import { menuItems } from "./menu-items";
import { SideBarItem } from "./SideBarItem";

export function SideBarOpen({
    toggleSideBar,
    path,
    isOpen,
    changeRoute,
}: {
    toggleSideBar: () => void;
    path: string;
    isOpen: boolean,
    changeRoute: (route: string) => void;
}) {
    return (
        <div className="bg-surface-dark-4 min-h-svh w-43 flex flex-col p-2">
            <div className="flex justify-between items-center p-2">
                <h1 className="text-xl text-primary-400 font-medium">Zendo</h1>
                <Button onClick={toggleSideBar} className="bg-surface-dark-5">
                    <ArrowLeftToLine className="text-primary-400" />
                </Button>
            </div>

            <div className="flex flex-col gap-2 w-full">
                {menuItems.map((item) => (
                    <SideBarItem
                        key={item.route}
                        {...item}
                        activeRoute={path}
                        changeRoute={changeRoute}
                        isOpen={isOpen}
                    />
                ))}
            </div>
        </div>
    );
}
