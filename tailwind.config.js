const engineConfig = require("./engine.config");

const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const selectorParser = require("postcss-selector-parser");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./colors.ts",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./blocks/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [...(engineConfig.safelist || [])],
  theme: {
    fontFamily: {
      ...(engineConfig.theme.fontFamily || {}),
    },
    fontSize: {
      ...(engineConfig.theme.fontSize || {}),
    },
    fontWeight: {
      ...(engineConfig.theme.fontWeight || {}),
    },
    screens: {
      "2xs": "375px",
      ...defaultTheme.screens,
    },
    fill: (theme) => ({
      current: "currentColor",
    }),
    colors: {
      transparent: "transparent",
      white: "white",
      black: "black",
      current: "currentColor",
      gray: colors.gray,
      ...(engineConfig.theme.colors || {}),
    },
    extend: {
      maxWidth: {
        inner: "1370px",
        outer: "1760px",
      },
      spacing: {
        30: "120px",
      },
      aspectRatio: {
        "3/4": "3 / 4",
      },
      gap: {
        30: "120px",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
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
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("flowbite-typography"),

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
