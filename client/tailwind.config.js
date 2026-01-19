/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                vv: {
                    bg: {
                        primary: '#0F1419',
                        secondary: '#1A1F2E',
                        tertiary: '#252D3D',
                        hover: '#2D3748',
                    },
                    green: '#00A651',
                    'green-accent': '#00D66C',
                    'green-dark': '#008844',
                    success: '#10B981',
                    danger: '#EF4444',
                    warning: '#F59E0B',
                    info: '#3B82F6',
                    text: {
                        primary: '#E8EAED',
                        secondary: '#9BA1A6',
                        tertiary: '#6C7A89'
                    }
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
