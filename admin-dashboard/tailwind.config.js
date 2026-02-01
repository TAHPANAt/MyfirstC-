/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                'ant-primary': '#1677ff',
                'ant-primary-hover': '#4096ff',
                'ant-primary-active': '#0958d9',
            },
            borderRadius: {
                'ant': '6px',
            }
        },
    },
    plugins: [],
}
