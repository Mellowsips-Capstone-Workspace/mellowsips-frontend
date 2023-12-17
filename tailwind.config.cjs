/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,tsx,ts}"],
    theme: {
        extend: {
            gridTemplateRows: {
                "0": 0
            },
            data: {
                submitting: "submitting='true'",
            },
            minWidth: {
                "20": "5rem",
                "24": "6rem"
            },
            borderWidth: {
                "2.5": "2.5px"
            },
            transitionProperty: {
                "grid-rows": "grid—template—rows"
            },
            colors: {
                "main-primary": "#F46E21",
                "main-secondary": "#003049",
                tertiary: "#FF2424",
                black: "#000",
                white: "#fff",
                medium: "#cccccc",
                light: "#f8f4f4",
                danger: "#ff5252",
                dark: "#0c0c0c",
                success: "#4BB543",
                "deep-blue": "#003049",
                "cool-grey": "#8C90A6",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                }
            },
            aria: {
                invalid: 'invalid="true"',
                visible: 'visible="true"',
                invisible: 'visible="false"',
                current: 'current="true"'
            },
            borderRadius: {
                "2": "8px"
            },
            backgroundImage: {
                "app-gradient": "linear-gradient(90deg, rgba(254, 239, 231, 0.23), rgba(244, 110, 33, 0.27))"
            },
            minHeight: {
                "dynamic-screen": "100dvh",
                "dashboard-header": "3.5rem",
                "dashboard-body": "calc(100dvh - 3.5rem)",
                "110": "27.5rem",
                "96": "26rem",
            },
            height: {
                "dynamic-screen": "100dvh",
                "dashboard-header": "3.5rem",
                "dashboard-body": "calc(100dvh - 3.5rem)"
            },
            width: {
                "110": "27.5rem",
                "220": "55rem"
            },
            fontSize: {
                print: "0.625rem"
            }
        },
    },
    plugins: [],
}