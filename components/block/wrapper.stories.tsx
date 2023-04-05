import { Spacing as SpacingComponent } from "./Spacing";
import { Wrapper as WrapperComponent } from "./Wrapper";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  BlockRadiusType,
  BLOCK_RADIUS_OPTIONS,
} from "./background.options";
import { SPACE_OPTIONS } from "./spacing.options";
import { WidthType, WIDTH_OPTIONS } from "./width.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: WrapperComponent,
  title: "Components/Block/Wrapper",
} as Meta;

export const WithoutBackground = () => (
  <div className="border">
    <WrapperComponent
      theme={{
        background: null as any,
        space: {
          top: "none",
          bottom: "none",
        },
      }}
    >
      no background
    </WrapperComponent>
  </div>
);

export const WithBackground = () => (
  <div className="border">
    <WrapperComponent
      theme={{
        background: "black",
        space: {
          top: "none",
          bottom: "none",
        },
      }}
    >
      with background
    </WrapperComponent>
  </div>
);

export const Colors = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[])
      .reverse()
      .map((color: BackgroundColorType) => (
        <div key={color} className="mb-px">
          <WrapperComponent
            theme={{
              background: color,
              space: { top: "none", bottom: "none" },
            }}
          >
            {color}
          </WrapperComponent>
        </div>
      ))}
  </>
);

export const Spacing = () => (
  <div>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="border mb-4 px-4">
        <WrapperComponent
          theme={{
            space: { top: size, bottom: size },
            background: "black",
          }}
        >
          Block space {label}
        </WrapperComponent>
      </div>
    ))}
  </div>
);

export const WithContent = () => (
  <div className="border">
    <WrapperComponent
      theme={{
        background: "black",
        text: "white",
        space: {
          top: "lg",
          bottom: "lg",
        },
      }}
    >
      <SpacingComponent space={{ top: "sm", bottom: "sm" }}>
        <div className="font-bold text-2xl">…</div>
      </SpacingComponent>
    </WrapperComponent>
  </div>
);

export const Rounded = () => (
  <div className="flex flex-col gap-10">
    {(Object.keys(BLOCK_RADIUS_OPTIONS) as BlockRadiusType[]).map(
      (radius: BlockRadiusType) => (
        <div key={radius}>
          <WrapperComponent
            theme={{
              background: "black",
              text: "white",
              rounded: {
                top: radius,
                bottom: radius,
              },
            }}
          >
            <SpacingComponent space={{ top: "sm", bottom: "sm" }}>
              <div className="font-bold text-2xl">{radius}</div>
            </SpacingComponent>
          </WrapperComponent>
          <WrapperComponent
            theme={{
              background: "black",
              text: "white",
              width: "inner",
              rounded: {
                top: radius,
                bottom: radius,
              },
            }}
          >
            <SpacingComponent space={{ top: "sm", bottom: "sm" }}>
              <div className="font-bold text-2xl">{radius}</div>
            </SpacingComponent>
          </WrapperComponent>
        </div>
      ),
    )}
  </div>
);

export const Widths = () => (
  <div className="flex flex-col gap-10">
    {(Object.keys(WIDTH_OPTIONS) as WidthType[]).map((width: WidthType) => (
      <WrapperComponent
        key={width}
        theme={{
          background: "black",
          text: "white",
          width,
        }}
      >
        <SpacingComponent space={{ top: "sm", bottom: "sm" }}>
          <div className="font-bold text-2xl">{width}</div>
        </SpacingComponent>
      </WrapperComponent>
    ))}
  </div>
);
