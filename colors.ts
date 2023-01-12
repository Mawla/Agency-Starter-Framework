import { isDarkColor } from "./helpers/utils/color";

import { ColorType } from "./types";

export const COLORS = {
  white: "#fff",
  black: "#000000",

  // neutrals
  "neutral-base": "#21283b",
  "neutral-10": "#18181B",
  "neutral-25": "#595d6a",
  "neutral-50": "#90939d",
  "neutral-75": "#c7c9cd",
  "neutral-85": "#dddee1",
  "neutral-95": "#f3f4f4",

  // purple
  "brand-base": "#8334c2",
  "brand-dark": "#5b2488",
  "brand-light": "#f2eaf8",

  // action
  "action-base": "#067f96",
  "action-dark": "#045767",
  "action-light": "#e5f1f4",

  // error
  "error-base": "#df1654",
  "error-dark": "#b21143",
  "error-light": "#fbe7ed",

  // success
  "success-base": "#1d8147",
  "success-dark": "#145a31",
  "success-light": "#e8f2ec",

  // alert
  "alert-base": "#ffdc50",
  "alert-dark": "#ffc010",
  "alert-light": "#fff8dc",

  // coral
  "coral-base": "#ff5a8c",
  "coral-dark": "#b4286e",
  "coral-light": "#fabed2",

  // orange
  "orange-base": "#ff823c",
  "orange-dark": "#dc5a0a",
  "orange-light": "#ffbe96",

  // yellow
  "yellow-base": "#facd28",
  "yellow-dark": "#ffb900",
  "yellow-light": "#fae187",

  // green
  "green-base": "#82b91e",
  "green-dark": "#6e9600",
  "green-light": "#bee691",

  // blue
  "blue-base": "#32b9cd",
  "blue-dark": "#327896",
  "blue-light": "#aae6f5",

  // lilac
  "lilac-base": "#7882e6",
  "lilac-dark": "#55509c",
  "lilac-light": "#c8c8fa",
};

Object.entries(COLORS).map(([key, value]) => {
  const colorKey = key as ColorType;
  if (/^#[0-9A-F]{3}$/i.test(value)) {
    return (COLORS[colorKey] = value
      .split("")
      .map((hex) => `${hex}${hex}`)
      .join("")
      .substring(1));
  }
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
    console.error(
      `Found a color in colors.ts (${value}) that is not formatted as a hexadecimal. Make sure all colors are formatted like #ffffff.`
    );
    COLORS[colorKey] = "#ff0000";
  }
});

export const ALL_COLORS = Object.keys(COLORS) as ColorType[];

export const STORYBOOK_COLORS_SUBSET = COLORS;
// use this if you have a lot of colors and don't to use all of them in storybook
// export const STORYBOOK_COLORS_SUBSET = pick(COLORS, 'white', 'black');

export const backgroundClasses: Record<ColorType, string> = Object.entries(
  COLORS
).reduce<Record<ColorType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `bg-${key}` }),
  {} as Record<ColorType, string>
);

export const textClasses: Record<ColorType, string> = Object.entries(
  COLORS
).reduce<Record<ColorType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `text-${key}` }),
  {} as Record<ColorType, string>
);

export const borderClasses: Record<ColorType, string> = Object.entries(
  COLORS
).reduce<Record<ColorType, string>>(
  (acc, [key, value]) => ({ ...acc, [key]: `border-${key}` }),
  {} as Record<ColorType, string>
);

const PROSE_BACKGROUND_OVERRIDES: Record<"green-dark", string> = {
  "green-dark": "prose-invert",
};

export const proseClasses: Record<ColorType, string> = Object.entries(
  COLORS
).reduce<Record<ColorType, string>>((acc, [key, value]) => {
  const colorKey = key as keyof typeof PROSE_BACKGROUND_OVERRIDES;
  return {
    ...acc,
    [key]:
      PROSE_BACKGROUND_OVERRIDES[colorKey] || isDarkColor(value)
        ? "prose-invert"
        : "prose-coal",
  };
}, {} as Record<ColorType, string>);
