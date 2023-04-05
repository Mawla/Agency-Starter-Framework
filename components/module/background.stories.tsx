import { Background as ModuleBackground } from "./Background";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  ModuleRadiusType,
  MODULE_RADIUS_OPTIONS,
} from "./background.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: ModuleBackground,
  title: "Components/Module/Background",
} as Meta;

export const Background = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color: BackgroundColorType) => (
        <div key={color} className="mb-10">
          <ModuleBackground theme={{ background: color }}>
            <div className="p-8">Module background {color}</div>
          </ModuleBackground>
        </div>
      ),
    )}
  </>
);

export const Rounded = () => (
  <div className="flex flex-col gap-10">
    {(Object.keys(MODULE_RADIUS_OPTIONS) as ModuleRadiusType[]).map(
      (radius: ModuleRadiusType) => (
        <ModuleBackground
          key={radius}
          theme={{
            background: "black",
            rounded: { top: radius, bottom: radius },
          }}
        >
          <div className="p-40">{radius}</div>
        </ModuleBackground>
      ),
    )}
  </div>
);
