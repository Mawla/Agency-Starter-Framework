import { Tag } from "./Tag";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Tag,
  title: "Components/Tag",
} as Meta;

export const Default = () => <Tag label="label" />;

export const Colors = () => (
  <Tag
    label="label"
    theme={{
      color: "white",
      background: "black",
    }}
  />
);
