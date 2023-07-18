const PicoSanity = require("picosanity");
const fs = require("fs").promises;

const client = new PicoSanity({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "development",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
});

export type ThemeType = {
  colors: { name: string; value: string }[];
  fonts: { name: string; value: string }[];
  stylesheets: string[];
};

/**
 * Get published theme from Sanity config.theme
 */

async function getTheme(): Promise<ThemeType> {
  const theme = await client.fetch(`*[_id == "config_theme"][0] {
    colors[] { name, value },
    fonts[] { name, value },
    "stylesheets": stylesheets[] { value }.value
  }`);
  return theme;
}

/**
 * Format colours
 */

function formatColors(colors: { name: string; value: string }[]) {
  const formattedColors = colors.reduce((acc, color) => {
    const { name, value } = color;
    const formattedName = name.replace(/ /g, "-").toLowerCase();
    acc[formattedName] = value;
    return acc;
  }, {} as Record<string, string>);
  return formattedColors;
}

/**
 * Format fonts
 */

function formatFonts(fonts: { name: string; value: string }[]) {
  const formattedFonts = fonts.reduce((acc, font) => {
    const { name, value } = font;
    const formattedName = name.replace(/ /g, "-").toLowerCase();
    acc[formattedName] = value
      .replace(/"/g, "")
      .replace(/'/g, "")
      .split(",")
      .map((font) => font.trim());
    return acc;
  }, {} as Record<string, string[]>);
  return formattedFonts;
}

/**
 * format safelist of colours and fonts
 * e.g safelist: ["bg-primary", "text-primary", "font-primary"]
 */

function formatSafelist(
  colors: ThemeType["colors"],
  fonts: ThemeType["colors"],
) {
  function clean(name: string) {
    return name.replace(/ /g, "-").toLowerCase();
  }

  const safelist = [
    ...colors.map((color) => `bg-${clean(color.name)}`),
    ...colors.map((color) => `border-${clean(color.name)}`),
    ...colors.map((color) => `text-${clean(color.name)}`),
    ...fonts.map((font) => `font-${clean(font.name)}`),
  ];
  return safelist;
}

async function init() {
  const theme = await getTheme();

  // write colours and fonts to file _theme.json
  const colors = formatColors(theme.colors);
  const fonts = formatFonts(theme.fonts);
  const safelist = formatSafelist(theme.colors, theme.fonts);

  await fs.writeFile(
    "_theme.json",
    JSON.stringify(
      {
        colors,
        fonts,
        safelist,
      },
      null,
      2,
    ),
  );

  // write stylesheets to file
  await fs.writeFile("public/_theme.css", theme.stylesheets.join("\n\n"));
}

init();
