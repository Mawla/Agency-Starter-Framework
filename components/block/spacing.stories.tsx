import { Spacing as SpacingComponent } from "./Spacing";
import { SPACE_OPTIONS } from "./spacing.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: SpacingComponent,
  title: "Components/Block/Spacing",
} as Meta;

export const Padding = () => (
  <div>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="border mb-4 px-4">
        <SpacingComponent padding={{ top: size, bottom: size }}>
          Block padding {label}
        </SpacingComponent>
      </div>
    ))}
  </div>
);

export const Margin = () => (
  <div>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="border mb-4 px-4">
        <div className="border w-full h-10" />
        <SpacingComponent margin={{ top: size, bottom: size }}>
          Block margin {label}
        </SpacingComponent>
        <div className="border w-full h-10" />
      </div>
    ))}
  </div>
);

export const NoValue = () => (
  <div>
    <div className="border mb-4 px-4">
      <SpacingComponent padding={{ top: null as any, bottom: null as any }}>
        padding top: null, bottom: null
      </SpacingComponent>
      <SpacingComponent padding={{ top: null as any }}>
        padding top: null
      </SpacingComponent>
      <SpacingComponent padding={{ bottom: null as any }}>
        padding bottom: null
      </SpacingComponent>
      <SpacingComponent padding={null as any}>padding null</SpacingComponent>
      <SpacingComponent margin={{ top: null as any, bottom: null as any }}>
        margin top: null, bottom: null
      </SpacingComponent>
      <SpacingComponent margin={{ top: null as any }}>
        margin top: null
      </SpacingComponent>
      <SpacingComponent margin={{ bottom: null as any }}>
        margin bottom: null
      </SpacingComponent>
      <SpacingComponent margin={null as any}>margin null</SpacingComponent>
    </div>
  </div>
);
