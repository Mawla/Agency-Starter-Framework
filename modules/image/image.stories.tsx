import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { demoImage2 } from "../../stories/content";
import { ColorType } from "../../types";
import { Image } from "./Image";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Image,
  title: "Modules/Image",
} as Meta;

export const Default = () => <Image title="Image" image={demoImage2} />;

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color1: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (color2: ColorType) => (
            <div key={`${color1}${color2}`} className="mb-10">
              <Image
                title="Image"
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
