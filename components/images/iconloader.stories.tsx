import engineConfig from "../../engine.config";
import { PREDEFINED_ICONS } from "../../types";
import { IconLoader } from "./IconLoader";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: IconLoader,
  title: "Components/IconLoader",
} as Meta;

export const Sources = () => (
  <div className="flex flex-wrap gap-10">
    {(engineConfig?.icons || PREDEFINED_ICONS).map((icon: string) => (
      <IconLoader title={icon} icon={icon} key={icon} className="w-10 h-10" />
    ))}
  </div>
);
