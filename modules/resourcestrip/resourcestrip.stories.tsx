import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { ResourceStrip } from "./ResourceStrip";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: ResourceStrip,
  title: "Modules/ResourceStrip",
} as Meta;

export const Default = () => <ResourceStrip title="ResourceStrip" />;

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color1: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (color2: ColorType) => (
            <div key={`${color1}${color2}`} className="mb-10">
              <ResourceStrip
                title="ResourceStrip"
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
