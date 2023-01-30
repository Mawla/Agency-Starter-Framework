import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { DEMO_FLAT_BREADCRUMB } from "../../test/fixtures/breadcrumb";
import { ColorType } from "../../types";
import { Breadcrumb } from "./Breadcrumb";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Breadcrumb,
  title: "Modules/Breadcrumb",
} as Meta;

export const Default = () => <Breadcrumb path={DEMO_FLAT_BREADCRUMB} />;

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (text: ColorType) => (
            <div key={color} className="mb-10">
              <Breadcrumb
                theme={{ background: color, text: text }}
                path={DEMO_FLAT_BREADCRUMB}
              />
            </div>
          ),
        ),
    )}
  </>
);
