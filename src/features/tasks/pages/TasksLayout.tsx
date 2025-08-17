import { Outlet, useLocation } from "react-router-dom";

import { Header } from "@components/layouts/Header";

import { SideBar } from "@/features/tasks/components/SideBar/SideBar";



export const TasksLayout = () => {

    return (
        <div className="bg-surface-dark-1 min-h-screen">
            <Header />
            <div className="flex">
                <SideBar />
                <div className="p-10 w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
