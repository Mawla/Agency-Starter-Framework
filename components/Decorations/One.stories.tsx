import { Meta } from "@storybook/react";
import React from "react";

import { One } from "./One";
import {
  ColorType,
  COLOR_OPTIONS,
  DirectionType,
  DIRECTION_OPTIONS,
} from "./OneOptions";

export default {
  component: One,
  title: "Components/One",
} as Meta;

export const Default = () => <One />;

export const Colors = () => (
  <>
    {(Object.keys(COLOR_OPTIONS) as ColorType[]).map((color: ColorType) => (
      <div key={color} className="mb-10">
        <One color={color} />
      </div>
    ))}
  </>
);

export const Directions = () => (
  <>
    {(Object.keys(DIRECTION_OPTIONS) as DirectionType[]).map(
      (direction: DirectionType) => (
        <div key={direction} className="mb-10 relative">
          <span className="absolute bg-white p-2">{direction}</span>
          <One direction={direction} />
        </div>
      )
    )}
  </>
);
