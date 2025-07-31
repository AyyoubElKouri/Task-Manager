import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import TaskDashboard from "./pages/TaskDashboard";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <TaskDashboard />
    </StrictMode>
);
