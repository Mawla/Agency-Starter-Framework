import { Background as BlockBackground } from "./Background";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  BlockRadiusType,
  BLOCK_RADIUS_OPTIONS,
} from "./background.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: BlockBackground,
  title: "Components/Block/Background",
} as Meta;

export const Background = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <div key={color} className="mb-10">
          <BlockBackground theme={{ background: color }}>
            <div className="p-8">Block background {color}</div>
          </BlockBackground>
        </div>
      ),
    )}
  </>
);

export const Rounded = () => (
  <div className="flex flex-col gap-10">
    {(Object.keys(BLOCK_RADIUS_OPTIONS) as BlockRadiusType[]).map(
      (radius: BlockRadiusType) => (
        <BlockBackground
          key={radius}
          theme={{
            background: "black",
            rounded: { top: radius, bottom: radius },
          }}
        >
          <div className="p-40 text-white">{radius}</div>
        </BlockBackground>
      ),
    )}
  </div>
);
