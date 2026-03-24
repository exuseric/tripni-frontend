import react from '@vitejs/plugin-react';
import {defineConfig} from 'vitest/config';
import {config} from 'dotenv';


config();

export default defineConfig({
    resolve: {
        tsconfigPaths: true
    },
    test: {
        env: {
            DATABASE_URL: process.env.TEST_DATABASE_URL!
        }
    },
    plugins: [react()]
});