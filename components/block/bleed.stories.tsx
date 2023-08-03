import { Bleed as BleedComponent } from "./Bleed";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: BleedComponent,
  title: "Components/Block/Bleed",
} as Meta;

export const BleedNone = () => (
  <div className="bg-gray-100">
    <BleedComponent bleed="none">
      <div className="bg-black/10 p-10" />
    </BleedComponent>
  </div>
);

export const BleedSmall = () => (
  <div className="bg-gray-100">
    <BleedComponent bleed="sm">
      <div className="bg-black/10 p-10" />
    </BleedComponent>
  </div>
);

export const BleedDefault = () => (
  <div className="bg-gray-100">
    <BleedComponent bleed="md">
      <div className="bg-black/10 p-10" />
    </BleedComponent>
  </div>
);

export const BleedLarge = () => (
  <div className="bg-gray-100">
    <BleedComponent bleed="lg">
      <div className="bg-black/10 p-10" />
    </BleedComponent>
  </div>
);
