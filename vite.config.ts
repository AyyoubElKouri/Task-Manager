import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),

            "@tasks": path.resolve(__dirname, "./src/features/tasks"),
            "@auth": path.resolve(__dirname, "./src/features/auth"),
            "@marketing": path.resolve(__dirname, "./src/features/marketing"),
            
            "@components": path.resolve(__dirname, "./src/components"),
            "@helpers": path.resolve(__dirname, "./src/helpers"),
            "@assets": path.resolve(__dirname, "./src/assets"),
        },
    },
});
