/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                background: '#09090b', // zinc-950
                surface: '#18181b', // zinc-900
                primary: '#10b981', // emerald-500
                secondary: '#3b82f6', // blue-500
                danger: '#ef4444', // red-500

                // Semantic
                loss: '#f43f5e', // rose-500
                gain: '#10b981', // emerald-500
            }
        },
    },
    plugins: [],
}
