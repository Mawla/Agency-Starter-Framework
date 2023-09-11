/**
 * Format colours
 */
import {
  BORDER_RADIUS_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  PADDING_OPTIONS,
  RATIOS,
  TEXT_TRANSFORM_OPTIONS,
} from "../../types";
import { ConfigType, GroqThemeType } from "./build";

const defaultTheme = require("tailwindcss/defaultTheme");

export function formatColors(colors: { name: string; value: string }[]) {
  const formattedColors =
    colors?.filter(Boolean).reduce((acc, color) => {
      const { name, value } = color;
      const formattedName = name.replace(/ /g, "-").toLowerCase();
      acc[formattedName] = value;
      return acc;
    }, {} as ConfigType["theme"]["colors"]) || {};

  if (!formattedColors?.white) formattedColors.white = "#ffffff";
  if (!formattedColors?.black) formattedColors.black = "#000000";

  return formattedColors;
}

/**
 * Format fonts
 */

export function formatFontFamily(fonts: { name: string; value: string }[]) {
  const formattedFonts = fonts?.filter(Boolean).reduce((acc, font) => {
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
 * Format font weights
 */

export function formatFontWeight(weights: { name: string; value: string }[]) {
  const formattedFontWeights = weights
    ?.filter(Boolean)
    .reduce((acc, weight) => {
      const { name, value } = weight;
      const formattedName = name.replace(/ /g, "-").toLowerCase();
      acc[formattedName] = +value
        .toString()
        .replace(/"/g, "")
        .replace(/'/g, "")
        .trim();
      return acc;
    }, {} as ConfigType["theme"]["fontWeight"]);
  return formattedFontWeights;
}

/**
 * Format font sizes with lineheight, letter spacing and font weight
 * e.g
 *
 * ['1.5rem', {
 *  lineHeight: '2rem',
 *  letterSpacing: '-0.01em',
 *  fontWeight: '500',
 * }],
 */

export function formatFontSize(
  fontSizes: GroqThemeType["fontSize"],
): ConfigType["theme"]["fontSize"] {
  const formattedFontSizes = fontSizes?.reduce((acc, fontSize) => {
    const { name, size, lineHeight, letterSpacing, fontWeight } = fontSize;
    const formattedName = name.replace(/ /g, "-").toLowerCase();

    if (!lineHeight && !letterSpacing && !fontWeight) {
      return { ...acc, [formattedName]: size };
    }

    const obj: ConfigType["theme"]["fontSize"][0][1] = {};
    if (lineHeight) obj["lineHeight"] = lineHeight;
    if (letterSpacing) obj["letterSpacing"] = letterSpacing;
    if (fontWeight) obj["fontWeight"] = fontWeight;

    acc[formattedName] = [size, obj];

    return acc;
  }, {} as ConfigType["theme"]["fontSize"]);

  return formattedFontSizes;
}

/**
 * format safelist of colours and fonts
 * e.g safelist: ["bg-primary", "text-primary", "font-primary", "md:bg-primary", "lg:bg-primary", ...]
 */

export function formatSafelist({
  colors = {},
  fontFamily = {},
  fontSize = {},
  fontWeight = {},
}: ConfigType["theme"]) {
  function clean(str: string) {
    const result = str.replace(/ /g, "-").toLowerCase();
    return result;
  }

  const safelist = [
    ...Object.keys(colors).map((color) => `bg-${clean(color)}`),
    ...Object.keys(colors).map((color) => `text-${clean(color)}`),
    ...Object.keys(colors).map((color) => `border-${clean(color)}`),
    ...Object.keys(colors).map((color) => `hover:bg-${clean(color)}`),
    ...Object.keys(colors).map((color) => `hover:text-${clean(color)}`),
    ...Object.keys(colors).map((color) => `hover:border-${clean(color)}`),
    ...Object.keys(colors).map((color) => `divide-${clean(color)}`),

    ...Object.keys(fontFamily).map((font) => `font-${clean(font)}`),
    ...Object.keys(fontWeight).map((weight) => `font-${clean(weight)}`),
    ...Object.keys(fontSize).map((size) => `text-${clean(size)}`),
    ...Object.keys(TEXT_TRANSFORM_OPTIONS).map(
      (transform) => `${clean(transform)}`,
    ),
    ...Object.keys(PADDING_OPTIONS).map((p) => `px-${clean(p)}`),
    ...Object.keys(PADDING_OPTIONS).map((p) => `py-${clean(p)}`),
    ...Object.keys(PADDING_OPTIONS).map((p) => `pb-${clean(p)}`),
    ...Object.keys(PADDING_OPTIONS).map((p) => `pt-${clean(p)}`),

    ...Object.keys(BORDER_WIDTH_OPTIONS).map((size) => `border-${clean(size)}`),
    ...Object.keys(RATIOS).map((ratio) => `aspect-[${clean(ratio)}]`),
    ...Object.keys(BORDER_RADIUS_OPTIONS).map(
      (size) => `rounded-${clean(size)}`,
    ),
  ];

  // safelist all these classes for each breakpoint
  const safelistWithBreakpoints = safelist.reduce((acc, className) => {
    acc.push(className);
    Object.keys(defaultTheme.screens).forEach((screen) => {
      acc.push(`${screen}:${className}`);
    });
    return acc;
  }, [] as string[]);

  return safelistWithBreakpoints;
}
