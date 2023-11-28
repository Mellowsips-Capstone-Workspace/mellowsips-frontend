import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(
    {
        plugins: [
            react(),
            tsconfigPaths(),
            eslint(
                {
                    cache: false,
                    include: ["./src/**/*.ts", "./src/**/*.tsx"],
                }
            )
        ],
        server: {
            host: true,
            port: 5000,
            open: true
        },
        build: {
            sourcemap: false,
            chunkSizeWarningLimit: 1000
        }
    }
)
