import { Meta } from "@storybook/react";
import React from "react";

import { Spacing as SpacingComponent } from "./Spacing";
import { SPACE_OPTIONS } from "./SpacingOptions";

export default {
  component: SpacingComponent,
  title: "Components/Module/Spacing",
} as Meta;

export const Sizes = () => (
  <div>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string
      ][]
    ).map(([size, label]) => (
      <div key={label} className="border mb-4 px-4">
        <SpacingComponent space={{ top: size, bottom: size }}>
          Module space {label}
        </SpacingComponent>
      </div>
    ))}
  </div>
);

export const Top = () => (
  <div>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string
      ][]
    ).map(([size, label]) => (
      <div key={label} className="border mb-4 px-4">
        <SpacingComponent space={{ top: size, bottom: null as any }}>
          Module space {label}
        </SpacingComponent>
      </div>
    ))}
  </div>
);

export const Bottom = () => (
  <div>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string
      ][]
    ).map(([size, label]) => (
      <div key={label} className="border mb-4 px-4">
        <SpacingComponent space={{ top: null as any, bottom: size }}>
          Module space {label}
        </SpacingComponent>
      </div>
    ))}
  </div>
);

export const NoValue = () => (
  <div>
    <div className="border mb-4 px-4">
      <SpacingComponent space={{ top: null as any, bottom: null as any }}>
        top: null, bottom: null
      </SpacingComponent>
      <SpacingComponent space={{ top: null as any }}>
        top: null
      </SpacingComponent>
      <SpacingComponent space={{ bottom: null as any }}>
        bottom: null
      </SpacingComponent>
      <SpacingComponent space={null as any}>null</SpacingComponent>
    </div>
  </div>
);
