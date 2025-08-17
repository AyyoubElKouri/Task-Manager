import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./features/marketing/pages/Home";
import Dashboard from "./features/tasks/pages/Dashboard";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import { TasksLayout } from "@tasks/pages/TasksLayout";

import "./globals.css";

export function Test() {
    return <div className="w-full h-full bg-accent-info">Hello</div>;
}

const router = createBrowserRouter([
    // Home ===========================================================================================================
    {
        path: "/",
        element: <Home />,
    },

    // Dashboard =======================================================================================================
    {
        path: "/dashboard",
        element: <TasksLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "contact", element: <Test /> },
        ],
    },

    // Login ===========================================================================================================
    {
        path: "/login",
        element: <Login />,
    },

    // Register ========================================================================================================
    {
        path: "/register",
        element: <Register />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
