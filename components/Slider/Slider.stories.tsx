import { Slider } from "./Slider";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Slider,
  title: "Components/Slider",
} as Meta;

export const Default = () => (
  <Slider
    slides={[
      <div className="border">hello</div>,
      <div className="border">hello</div>,
      <div className="border">hello</div>,
      <div className="border">hello</div>,
      <div className="border">hello</div>,
      <div className="border">hello</div>,
    ]}
    columns={3}
  />
);
