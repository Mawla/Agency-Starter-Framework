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

  expect(result).toContain("text-blue");
  expect(result).toContain("hover:bg-blue");
  expect(result).toContain("hover:border-blue");
  expect(result).toContain("hover:text-blue");
  expect(result).toContain("divide-blue");
  expect(result).toContain("sm:bg-blue");
  expect(result).toContain("sm:text-blue");
  expect(result).toContain("sm:hover:bg-blue");
  expect(result).toContain("sm:hover:border-blue");
  expect(result).toContain("sm:hover:text-blue");
  expect(result).toContain("sm:divide-blue");
  expect(result).toContain("md:bg-blue");
  expect(result).toContain("md:text-blue");
  expect(result).toContain("md:hover:bg-blue");
  expect(result).toContain("md:hover:border-blue");
  expect(result).toContain("md:hover:text-blue");
  expect(result).toContain("md:divide-blue");
  expect(result).toContain("lg:bg-blue");
  expect(result).toContain("lg:text-blue");
  expect(result).toContain("lg:hover:bg-blue");
  expect(result).toContain("lg:hover:border-blue");
  expect(result).toContain("lg:hover:text-blue");
  expect(result).toContain("lg:divide-blue");
  expect(result).toContain("xl:bg-blue");
  expect(result).toContain("xl:text-blue");
  expect(result).toContain("xl:hover:bg-blue");
  expect(result).toContain("xl:hover:border-blue");
  expect(result).toContain("xl:hover:text-blue");
  expect(result).toContain("xl:divide-blue");
  expect(result).toContain("2xl:bg-blue");
  expect(result).toContain("2xl:text-blue");
  expect(result).toContain("2xl:hover:bg-blue");
  expect(result).toContain("2xl:hover:border-blue");
  expect(result).toContain("2xl:hover:text-blue");
  expect(result).toContain("2xl:divide-blue");

  expect(result).toContain("font-primary");
  expect(result).toContain("sm:font-primary");
  expect(result).toContain("md:font-primary");
  expect(result).toContain("lg:font-primary");
  expect(result).toContain("xl:font-primary");
  expect(result).toContain("2xl:font-primary");

  expect(result).toContain("font-secondary");
  expect(result).toContain("sm:font-secondary");
  expect(result).toContain("md:font-secondary");
  expect(result).toContain("lg:font-secondary");
  expect(result).toContain("xl:font-secondary");
  expect(result).toContain("2xl:font-secondary");

  expect(result).toContain("font-thin");
  expect(result).toContain("sm:font-thin");
  expect(result).toContain("md:font-thin");
  expect(result).toContain("lg:font-thin");
  expect(result).toContain("xl:font-thin");
  expect(result).toContain("2xl:font-thin");

  expect(result).toContain("font-bold");
  expect(result).toContain("sm:font-bold");
  expect(result).toContain("md:font-bold");
  expect(result).toContain("lg:font-bold");
  expect(result).toContain("xl:font-bold");
  expect(result).toContain("2xl:font-bold");

  expect(result).toContain("text-xs");
  expect(result).toContain("sm:text-xs");
  expect(result).toContain("md:text-xs");
  expect(result).toContain("lg:text-xs");
  expect(result).toContain("xl:text-xs");
  expect(result).toContain("2xl:text-xs");

  expect(result).toContain("text-sm");
  expect(result).toContain("sm:text-sm");
  expect(result).toContain("md:text-sm");
  expect(result).toContain("lg:text-sm");
  expect(result).toContain("xl:text-sm");
  expect(result).toContain("2xl:text-sm");

  expect(result).toContain("uppercase");
  expect(result).toContain("lowercase");
  expect(result).toContain("capitalize");

  expect(result).toContain("px-20");
  expect(result).toContain("py-20");
  expect(result).toContain("pt-20");
  expect(result).toContain("pb-20");

  expect(result).toContain("border-0");
  expect(result).toContain("border-1");
  expect(result).toContain("border-2");
  expect(result).toContain("border-4");
  expect(result).toContain("border-8");

  expect(result).toContain("rounded-none");
  expect(result).toContain("rounded-sm");
  expect(result).toContain("rounded-full");
});
