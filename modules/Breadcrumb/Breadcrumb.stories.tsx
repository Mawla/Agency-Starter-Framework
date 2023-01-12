import { Meta } from "@storybook/react";
import React from "react";

import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { DEMO_SITEMAP } from "../../test/fixtures/sitemap";
import { ColorType } from "../../types";
import { Breadcrumb } from "./Breadcrumb";

export default {
  component: Breadcrumb,
  title: "Modules/Breadcrumb",
} as Meta;

export const Default = () => <Breadcrumb path={DEMO_SITEMAP} />;

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color: ColorType) =>
        (Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
          (text: ColorType) => (
            <div key={color} className="mb-10">
              <Breadcrumb
                theme={{ background: color, text: text }}
                path={DEMO_SITEMAP}
              />
            </div>
          )
        )
    )}
  </>
);
