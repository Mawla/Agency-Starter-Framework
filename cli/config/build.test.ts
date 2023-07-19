import {
  formatColors,
  formatFontFamily,
  formatFontWeight,
  formatFontSize,
  formatSafelist,
} from "./build";

test("format colors", () => {
  const result = formatColors([
    { name: "Primary", value: "#000000" },
    { name: "Secondary", value: "#ffffff" },
  ]);

  expect(result).toEqual({
    primary: "#000000",
    secondary: "#ffffff",
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
      black: "#000000",
      white: "#ffffff",
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

  console.log(result);

  expect(result).toEqual([
    "bg-black",
    "sm:bg-black",
    "md:bg-black",
    "lg:bg-black",
    "xl:bg-black",
    "2xl:bg-black",
    "bg-white",
    "sm:bg-white",
    "md:bg-white",
    "lg:bg-white",
    "xl:bg-white",
    "2xl:bg-white",
    "text-black",
    "sm:text-black",
    "md:text-black",
    "lg:text-black",
    "xl:text-black",
    "2xl:text-black",
    "text-white",
    "sm:text-white",
    "md:text-white",
    "lg:text-white",
    "xl:text-white",
    "2xl:text-white",
    "border-black",
    "sm:border-black",
    "md:border-black",
    "lg:border-black",
    "xl:border-black",
    "2xl:border-black",
    "border-white",
    "sm:border-white",
    "md:border-white",
    "lg:border-white",
    "xl:border-white",
    "2xl:border-white",
    "divide-black",
    "sm:divide-black",
    "md:divide-black",
    "lg:divide-black",
    "xl:divide-black",
    "2xl:divide-black",
    "divide-white",
    "sm:divide-white",
    "md:divide-white",
    "lg:divide-white",
    "xl:divide-white",
    "2xl:divide-white",
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
