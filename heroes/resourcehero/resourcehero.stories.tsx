import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { ResourceHero } from "./ResourceHero";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: ResourceHero,
  title: "Modules/ResourceHero",
} as Meta;

export const Default = () => <ResourceHero title="ResourceHero" />;

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color1: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (color2: ColorType) => (
            <div key={`${color1}${color2}`} className="mb-10">
              <ResourceHero
                title="ResourceHero"
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
