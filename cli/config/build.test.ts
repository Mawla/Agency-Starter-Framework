import {
  formatColors,
  formatFontFamily,
  formatFontWeight,
  formatFontSize,
  formatSafelist,
} from "./format-theme";

test("format colors", () => {
  const result = formatColors([
    { name: "Primary", value: "#ff0000" },
    { name: "Secondary", value: "#0000ff" },
  ]);

  expect(result).toEqual({
    primary: "#ff0000",
    secondary: "#0000ff",
    white: "#ffffff",
    black: "#000000",
  });
});

test("format font family", () => {
  const result = formatFontFamily([
    { name: "Primary", value: "Arial, sans-serif" },
    { name: "Secondary", value: "Helvetica, sans-serif" },
  ]);

  expect(result).toEqual({
    primary: ["Arial", "sans-serif"],
    secondary: ["Helvetica", "sans-serif"],
  });
});

test("format font weight", () => {
  const result = formatFontWeight([
    { name: "thin", value: "200" },
    { name: "bold", value: "600" },
  ]);

  expect(result).toEqual({
    thin: 200,
    bold: 600,
  });
});

test("format font size", () => {
  const result = formatFontSize([
    { name: "xs", size: "10px" },
    { name: "sm", size: "0.75rem", lineHeight: "1rem" },
    {
      name: "md",
      size: "0.875rem",
      lineHeight: "1.25rem",
      letterSpacing: "0.01em",
      fontWeight: "400",
    },
  ]);

  expect(result).toEqual({
    xs: "10px",
    sm: ["0.75rem", { lineHeight: "1rem" }],
    md: [
      "0.875rem",
      {
        lineHeight: "1.25rem",
        letterSpacing: "0.01em",
        fontWeight: "400",
      },
    ],
  });
});

test("generate safelist", () => {
  const result = formatSafelist({
    colors: {
      red: "#ff0000",
      blue: "#0000ff",
    },
    fontFamily: {
      primary: ["Arial", "sans-serif"],
      secondary: ["Helvetica", "sans-serif"],
    },
    fontWeight: {
      thin: 200,
      bold: 600,
    },
    fontSize: {
      xs: "10px",
      sm: "12px",
    },
  });

  expect(result).toEqual([
    "bg-red",
    "sm:bg-red",
    "md:bg-red",
    "lg:bg-red",
    "xl:bg-red",
    "2xl:bg-red",
    "bg-blue",
    "sm:bg-blue",
    "md:bg-blue",
    "lg:bg-blue",
    "xl:bg-blue",
    "2xl:bg-blue",
    "text-red",
    "sm:text-red",
    "md:text-red",
    "lg:text-red",
    "xl:text-red",
    "2xl:text-red",
    "text-blue",
    "sm:text-blue",
    "md:text-blue",
    "lg:text-blue",
    "xl:text-blue",
    "2xl:text-blue",
    "border-red",
    "sm:border-red",
    "md:border-red",
    "lg:border-red",
    "xl:border-red",
    "2xl:border-red",
    "border-blue",
    "sm:border-blue",
    "md:border-blue",
    "lg:border-blue",
    "xl:border-blue",
    "2xl:border-blue",
    "divide-red",
    "sm:divide-red",
    "md:divide-red",
    "lg:divide-red",
    "xl:divide-red",
    "2xl:divide-red",
    "divide-blue",
    "sm:divide-blue",
    "md:divide-blue",
    "lg:divide-blue",
    "xl:divide-blue",
    "2xl:divide-blue",
    "font-primary",
    "sm:font-primary",
    "md:font-primary",
    "lg:font-primary",
    "xl:font-primary",
    "2xl:font-primary",
    "font-secondary",
    "sm:font-secondary",
    "md:font-secondary",
    "lg:font-secondary",
    "xl:font-secondary",
    "2xl:font-secondary",
    "font-thin",
    "sm:font-thin",
    "md:font-thin",
    "lg:font-thin",
    "xl:font-thin",
    "2xl:font-thin",
    "font-bold",
    "sm:font-bold",
    "md:font-bold",
    "lg:font-bold",
    "xl:font-bold",
    "2xl:font-bold",
    "text-xs",
    "sm:text-xs",
    "md:text-xs",
    "lg:text-xs",
    "xl:text-xs",
    "2xl:text-xs",
    "text-sm",
    "sm:text-sm",
    "md:text-sm",
    "lg:text-sm",
    "xl:text-sm",
    "2xl:text-sm",
  ]);
});
