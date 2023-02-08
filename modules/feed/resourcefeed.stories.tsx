import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { ResourceFeed } from "./ResourceFeed";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: ResourceFeed,
  title: "Modules/ResourceFeed",
} as Meta;

export const Default = () => <ResourceFeed title="Feed" />;

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color1: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (color2: ColorType) => (
            <div key={`${color1}${color2}`} className="mb-10">
              <ResourceFeed
                title="Feed"
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
