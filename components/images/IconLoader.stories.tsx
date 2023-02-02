import { IconType, ICONS } from "../../types";
import { IconLoader } from "./IconLoader";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: IconLoader,
  title: "Components/IconLoader",
} as Meta;

export const Sources = () => (
  <div className="flex flex-wrap gap-10">
    {(Object.keys(ICONS) as IconType[]).map((icon: IconType) => (
      <IconLoader
        title={icon}
        icon={icon}
        key={icon}
        className="w-10 h-10"
        color="action-500"
      />
    ))}
  </div>
);
