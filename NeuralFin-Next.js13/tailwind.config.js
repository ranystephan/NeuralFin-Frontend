/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    "content/**/*.mdx"
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        },
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        blob1: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(130px, -50px) scale(1.2)' },
          '66%': { transform: 'stranslate(-15px, 22px) cale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blob2: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-130px, -50px) scale(1.2)' },
          '66%': { transform: 'stranslate(-13px, 10px) cale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blob3: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-130px, 0px) scale(1.2)' },
          '66%': { transform: 'stranslate(-30px, 350px) cale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        blob4: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(130px, 0px) scale(1.2)' },
          '66%': { transform: 'stranslate(-20px, 20px) cale(0.8)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },

      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob1: 'blob1 7s infinite',
        blob2: 'blob2 6s infinite',
        blob3: 'blob3 7s infinite',
        blob4: 'blob4 5s infinite',
      },

    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
  ]
}