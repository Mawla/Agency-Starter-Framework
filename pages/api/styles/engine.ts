import type { NextApiRequest, NextApiResponse } from "next";

const postcss = require("postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const nested = require("postcss-nested");
const prettify = require("postcss-prettify");

export const config = {
  maxDuration: 60,
};
const PicoSanity = require("picosanity");

const client = new PicoSanity({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "development",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
});

export type GroqThemeType = {
  colors: { name: string; value: string }[];
  fontFamily: { name: string; value: string }[];
  fontSize: {
    name: string;
    size: string;
    lineHeight?: string;
    letterSpacing?: string;
    fontWeight?: string;
  }[];
  fontWeight: { name: string; value: string }[];
  stylesheets: string[];
  icons: { predefined: {}; rest: [] };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  res.setHeader("Content-Type", "text/css");
  // res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  // get theme
  const theme: GroqThemeType = await client.fetch(`
    *[_id == "config_theme"][0] {
      colors[] { name, value },
      fontFamily[] { name, value },
      fontSize[] { name, size, lineHeight, letterSpacing, fontWeight },
      fontWeight[] { name, value },
      "stylesheets": stylesheets[] { value }.value,
    }`);

  let styles: string[] = [];

  // css variables
  styles.push(`
:root {
  ${theme.colors
    .map(({ name, value }) => `--color-${name}: ${value};`)
    .join("\n")}
  ${theme.fontFamily
    .map(({ name, value }) => `--font-${name}: ${value};`)
    .join("\n")}
  ${theme.fontWeight
    .map(({ name, value }) => `--font-weight-${name}: ${value};`)
    .join("\n")}
  ${theme.fontSize
    .map(({ name, size }) => `--font-size-${name}: ${size};`)
    .join("\n")}
}
`);

  // cms added stylesheet
  styles.push(theme.stylesheets?.join("\n"));

  const output = await postcss([
    autoprefixer,
    nested,
    prettify,
    // cssnano,
  ]).process(styles.join("\n"));

  res.status(200).send(output.css);
};

export default handler;
