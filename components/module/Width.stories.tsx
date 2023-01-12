import { Meta } from "@storybook/react";
import React from "react";

import { Width as WidthComponent } from "./Width";
import { WidthType, WIDTH_OPTIONS } from "./WidthOptions";

export default {
  component: WidthComponent,
  title: "Components/Module/Width",
} as Meta;

export const Widths = () => (
  <div className="flex flex-col gap-10">
    {(Object.keys(WIDTH_OPTIONS) as WidthType[]).map((width: WidthType) => (
      <div className="bg-neutral-95" key={width}>
        <WidthComponent width={width}>
          <div className="bg-neutral-25 p-10">{width}</div>
        </WidthComponent>
      </div>
    ))}
  </div>
);
