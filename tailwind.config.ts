import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        primaryfade: "hsla(166, 100%, 34%, 0.3)",
        secondary: "var(--secondary)",
        third: "var(--third)",
      },
      screens: {
        "3xl": "1600px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          lg: "1.5rem",
          xl: "2.625rem",
          "2xl": "4rem",
          "3xl": "5rem",
        },
      },
      spacing: {
        "25": "6.25rem",
        "30": "7.5rem",
        "50": "12.5rem",
      },
      boxShadow: {
        default: "0px 1px 10px rgba(0 , 0, 0, 0.05)",
      },
      letterSpacing: {
        tightest: "-.065em",
      },
      borderRadius: {
        default: "1.25rem",
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) {
      addUtilities({
        ".flex-center": {
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
        },
        ".flex-between": {
          display: "flex",
          "align-items": "center",
          "justify-content": "space-between",
        },
      });
    },
    function ({
      addVariant,
    }: {
      addVariant: (name: string, selector: string) => void;
    }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
export default config;
