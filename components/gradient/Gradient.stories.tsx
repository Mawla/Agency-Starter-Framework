import GradientComponent, { GradientProps } from "./Gradient";
import { GRADIENT_OPACITY_OPTIONS } from "./GradientOptions";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: GradientComponent,
  title: "Components/Gradient",
} as Meta;

export const Default = () => (
  <div className="grid grid-cols-4 gap-10">
    {GRADIENT_OPACITY_OPTIONS.map((from) =>
      GRADIENT_OPACITY_OPTIONS.map((to) => (
        <div
          className="w-64 h-64 bg-white rounded-lg mb-4 relative"
          key={`${from}${to}`}
        >
          <GradientComponent
            from={from as GradientProps["from"]}
            to={to as GradientProps["to"]}
          />
          <span className={"text-white bg-coal p-1 absolute top-4 left-4 z-10"}>
            opacity {from}
          </span>
          <span
            className={"text-white bg-coal p-1 absolute bottom-4 left-4 z-10"}
          >
            opacity {to}
          </span>
        </div>
      )),
    )}
  </div>
);
