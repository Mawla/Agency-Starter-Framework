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
      <div className="border" key={1}>
        hello
      </div>,
      <div className="border" key={2}>
        hello
      </div>,
      <div className="border" key={3}>
        hello
      </div>,
      <div className="border" key={4}>
        hello
      </div>,
      <div className="border" key={5}>
        hello
      </div>,
      <div className="border" key={6}>
        hello
      </div>,
    ]}
    columns={3}
  />
);
