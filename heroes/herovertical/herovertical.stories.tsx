import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { HeroVertical } from "./HeroVertical";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: HeroVertical,
  title: "Modules/HeroVertical",
} as Meta;

export const Default = () => <HeroVertical title="HeroVertical" />;

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color1: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (color2: ColorType) => (
            <div key={`${color1}${color2}`} className="mb-10">
              <HeroVertical
                title="HeroVertical"
                theme={{
                  module: { background: color1 },
                  text: { color: color2 },
                }}
              />
            </div>
          ),
        ),
    )}
  </>
);
