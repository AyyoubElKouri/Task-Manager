import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./features/marketing/pages/Home";
import Dashboard from "./features/tasks/pages/Dashboard";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import "./globals.css";

const Pages = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Pages />
        </BrowserRouter>
    </StrictMode>
);
