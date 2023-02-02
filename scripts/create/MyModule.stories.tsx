import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { MyModule } from "./MyModule";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: MyModule,
  title: "Modules/MyModule",
} as Meta;

export const Default = () => <MyModule title="MyModule" />;

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color1: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (color2: ColorType) => (
            <div key={`${color1}${color2}`} className="mb-10">
              <MyModule
                title="MyModule"
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
