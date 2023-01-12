import { Meta } from "@storybook/react";
import React from "react";

import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { Background as ModuleBackground } from "./Background";
import { ModuleRadiusType, MODULE_RADIUS_OPTIONS } from "./BackgroundOptions";

export default {
  component: ModuleBackground,
  title: "Components/Module/Background",
} as Meta;

export const Background = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color: ColorType) => (
        <div key={color} className="mb-10">
          <ModuleBackground theme={{ background: color }}>
            <div className="p-8">Module background {color}</div>
          </ModuleBackground>
        </div>
      )
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
            background: "brand-base",
            rounded: { top: radius, bottom: radius },
          }}
        >
          <div className="p-40">{radius}</div>
        </ModuleBackground>
      )
    )}
  </div>
);
