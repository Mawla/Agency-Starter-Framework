const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const selectorParser = require("postcss-selector-parser");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./colors.ts",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./heroes/**/*.{js,ts,jsx,tsx}",
    "./forms/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(neutral|action|brand)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /(bg|text|border)-(white|black)/,
    },
  ],
  theme: {
    extend: {
      cursor: {
        auto: "auto",
        default: "default",
        pointer: "pointer",
        grab: "grab",
        grabbing: "grabbing",
      },
      transitionTimingFunction: {
        "in-cubic": "cubic-bezier(0, 0, 0.38, 1)",
        "out-cubic": "cubic-bezier(0.2, 0.07, 1, 1)",
        "in-out-cubic": "cubic-bezier(0.2, 0.07, 0.38, 1)",
      },
      width: {
        "50vw": "50vw",
        "85vw": "85vw",
        "2xs": "375px",
      },
      aspectRatio: {
        "1/1": "1/1",
        "16/9": "16/9",
        "2/1": "2/1",
        "13/8": "13/8",
        "4/3": "4/3",
        "19/27": "19/27",
        "12/19": "12/19",
      },
    },
    borderRadius: {
      none: "0px",
      full: "9999px",
      "2xs": "4px",
      xs: "8px",
      sm: "12px",
      md: "16px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
      "3xl": "40px",
      "4xl": "64px",
      "5xl": "80px",
      "6xl": "128px",
    },
    minHeight: {
      0: "0",
      "1/2": "50vw",
      full: "100%",
    },
    maxHeight: {
      0: "0",
      half: "50%",
      full: "100%",
      screen: "100vh",
      "50vh": "50vh",
      "75vh": "75vh",
      "90vh": "90vh",
    },
    minWidth: {
      0: "0",
      full: "100%",
      "3xs": "275px",
      "2xs": "375px",
    },
    maxWidth: {
      none: "none",
      "2xs": "375px",
      xs: "500px",
      text: "650px",
      quote: "700px",
      title: "100ch",
      screen: "100vw",
      inner: "1370px",
      outer: "1760px",
      full: "100%",
      "1/2": "50%",
      "1/4": "25%",
      "40vw": "40vw",
      "50vw": "50vw",
      "60vw": "60vw",
      "75vw": "75vw",
      "90vw": "90vw",
      "1/3": "33.33333%",
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ["Circular", "Arial", "sans-serif"],
      mono: ["monospace"],
    },
    fontSize: {
      ...defaultTheme.fontSize,
    },
    fontWeight: {
      book: 300,
      bold: 700,
    },
    fontSize: {
      0: "0",
      base: "1rem",
      sm: `${12 / 16}rem`,
      md: `${14 / 16}rem`,
      lg: `${16 / 16}rem`,
      xl: [`${20 / 16}rem`, "1.3"],
      "2xl": [`${24 / 16}rem`, "1.3"],
      "3xl": [`${32 / 16}rem`, "1.3"],
      "4xl": [`${40 / 16}rem`, "1.3"],
      "5xl": [`${64 / 16}rem`, "1.3"],
      "6xl": [`${80 / 16}rem`, "1.3"],
    },
    screens: {
      "2xs": "375px",
      xs: "420px",
      sm: "640px",
      md: "768px",
      tablet: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fill: (theme) => ({
      white: "white",
      black: "black",
      current: "currentColor",
    }),
    transitionProperty: {
      "shadow-transform": "box-shadow, transform",
      ...defaultTheme.transitionProperty,
    },
    colors: {
      transparent: "transparent",
      white: "white",
      black: "black",
      current: "currentColor",
      neutral: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      brand: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      action: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
    },
    extend: {
      zIndex: {
        60: 60,
      },
      spacing: {
        25: "100px",
        30: "120px",
      },
      typography: ({ theme }) => ({
        current: {
          css: {
            "--tw-prose-body": "currentColor",
            "--tw-prose-strong": "currentColor",
            "--tw-prose-headings": "currentColor",
            "--tw-prose-lead": "currentColor",
            "--tw-prose-links": "currentColor",
            "--tw-prose-bold": "currentColor",
            "--tw-prose-counters": "currentColor",
            "--tw-prose-bullets": "currentColor",
            "--tw-prose-hr": "currentColor",
            "--tw-prose-quotes": "currentColor",
            "--tw-prose-quote-borders": "currentColor",
            "--tw-prose-captions": "currentColor",
            "--tw-prose-code": "currentColor",
            "--tw-prose-pre-code": "currentColor",
            "--tw-prose-pre-bg": "currentColor",
            "--tw-prose-th-borders": "currentColor",
            "--tw-prose-td-borders": "currentColor",
          },
        },
        invert: {
          css: {
            "--tw-prose-body": "white",
            "--tw-prose-strong": "white",
            "--tw-prose-headings": "white",
            "--tw-prose-lead": "white",
            "--tw-prose-links": "white",
            "--tw-prose-bold": "white",
            "--tw-prose-counters": "white",
            "--tw-prose-bullets": "white",
            "--tw-prose-hr": "white",
            "--tw-prose-quotes": "white",
            "--tw-prose-quote-borders": "white",
            "--tw-prose-captions": "white",
            "--tw-prose-code": "white",
            "--tw-prose-pre-code": "white",
            "--tw-prose-pre-bg": "white",
            "--tw-prose-th-borders": "white",
            "--tw-prose-td-borders": "white",
          },
        },
        // https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
        "3xl": {
          css: [
            {
              fontSize: "2rem",
            },
          ],
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),

    // group-focus-within variant
    plugin(function ({ addVariant, config }) {
      const prefixClass = function (className) {
        const prefix = config("prefix");
        const getPrefix = typeof prefix === "function" ? prefix : () => prefix;
        return `${getPrefix(`.${className}`)}${className}`;
      };

      const groupPseudoClassVariant = function (pseudoClass) {
        return ({ modifySelectors, separator }) => {
          return modifySelectors(({ selector }) => {
            return selectorParser((selectors) => {
              selectors.walkClasses((classNode) => {
                classNode.value = `group-${pseudoClass}${separator}${classNode.value}`;
                classNode.parent.insertBefore(
                  classNode,
                  selectorParser().astSync(
                    `.${prefixClass("group")}:${pseudoClass} `,
                  ),
                );
              });
            }).processSync(selector);
          });
        };
      };

      addVariant("group-focus-within", groupPseudoClassVariant("focus-within"));
    }),
  ],
};
