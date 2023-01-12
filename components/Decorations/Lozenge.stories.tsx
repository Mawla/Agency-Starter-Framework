import { Meta } from "@storybook/react";
import React from "react";

import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { Lozenge } from "./Lozenge";
import {
  RotationType,
  ROTATION_OPTIONS,
  SizeType,
  SIZE_OPTIONS,
} from "./LozengeOptions";

export default {
  component: Lozenge,
  title: "Components/Lozenge",
} as Meta;

export const Default = () => <Lozenge size="md" color="action-light" />;

export const Colors = () => (
  <>
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[]).map(
      (color: ColorType) => (
        <div key={color} className="mb-10">
          <Lozenge color={color} size="md" />
        </div>
      )
    )}
  </>
);

export const Rotations = () => (
  <>
    {Object.keys(ROTATION_OPTIONS).map((rotation) => (
      <div key={rotation} className="mb-10">
        <Lozenge
          rotation={+rotation as RotationType}
          size="md"
          color="action-light"
        />
      </div>
    ))}
  </>
);

export const Sizes = () => (
  <>
    {(Object.keys(SIZE_OPTIONS) as SizeType[]).map((size: SizeType) => (
      <div key={size} className="mb-10">
        {SIZE_OPTIONS[size]}
        <Lozenge size={size} color="action-light" />
      </div>
    ))}
  </>
);
