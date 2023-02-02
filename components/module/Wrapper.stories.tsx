import { STORYBOOK_COLORS_SUBSET } from "../../colors";
import { ColorType } from "../../types";
import { ModuleRadiusType, MODULE_RADIUS_OPTIONS } from "./BackgroundOptions";
import { Spacing as SpacingComponent } from "./Spacing";
import { SPACE_OPTIONS } from "./SpacingOptions";
import { WidthType, WIDTH_OPTIONS } from "./WidthOptions";
import { Wrapper as WrapperComponent } from "./Wrapper";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: WrapperComponent,
  title: "Components/Module/Wrapper",
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
        background: "lilac-light",
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
    {(Object.keys(STORYBOOK_COLORS_SUBSET) as ColorType[])
      .reverse()
      .map((color: ColorType) => (
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
            background: "action-light",
          }}
        >
          Module space {label}
        </WrapperComponent>
      </div>
    ))}
  </div>
);

export const WithContent = () => (
  <div className="border">
    <WrapperComponent
      theme={{
        background: "brand-base",
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
    {(Object.keys(MODULE_RADIUS_OPTIONS) as ModuleRadiusType[]).map(
      (radius: ModuleRadiusType) => (
        <div key={radius}>
          <WrapperComponent
            theme={{
              background: "brand-base",
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
              background: "brand-base",
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
          background: "brand-base",
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
