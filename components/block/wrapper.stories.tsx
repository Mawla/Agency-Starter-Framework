import { COLORS } from "../../theme";
import { ColorType } from "../../types";
import { Spacing as SpacingComponent } from "./Spacing";
import { Wrapper as WrapperComponent } from "./Wrapper";
import { BlockRadiusType, BLOCK_RADIUS_OPTIONS } from "./background.options";
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
        padding: {
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
        padding: {
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
    {(Object.keys(COLORS) as ColorType[]).reverse().map((color: ColorType) => (
      <div key={color} className="mb-px">
        <WrapperComponent
          theme={{
            background: color,
            padding: { top: "none", bottom: "none" },
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
            padding: { top: size, bottom: size },
            background: "black",
            text: "white",
          }}
        >
          Block padding {label}
        </WrapperComponent>
      </div>
    ))}
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="border mb-4 px-4">
        <WrapperComponent
          theme={{
            margin: { top: size, bottom: size },
            background: "black",
            text: "white",
          }}
        >
          Block margin {label}
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
        padding: {
          top: "lg",
          bottom: "lg",
        },
      }}
    >
      <SpacingComponent padding={{ top: "sm", bottom: "sm" }}>
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
            <SpacingComponent padding={{ top: "sm", bottom: "sm" }}>
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
            <SpacingComponent padding={{ top: "sm", bottom: "sm" }}>
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
        <SpacingComponent padding={{ top: "sm", bottom: "sm" }}>
          <div className="font-bold text-2xl">{width}</div>
        </SpacingComponent>
      </WrapperComponent>
    ))}
  </div>
);

export const OutsideBackground = () => (
  <div className="flex flex-col gap-10">
    <WrapperComponent
      theme={{
        background: "white",
        outerBackground: "black",
        text: "white",
        width: "inner",
        margin: {
          top: "lg",
          bottom: "lg",
        },
        rounded: {
          top: "lg",
          bottom: "lg",
        },
        padding: {
          top: "none",
          bottom: "none",
        },
      }}
    >
      …
    </WrapperComponent>
    <WrapperComponent
      theme={{
        background: "white",
        outerBackground: "black",
        text: "black",
        width: "inner",
      }}
    >
      …
    </WrapperComponent>
  </div>
);

const SQUARE = {
  background: "blue",
  opacity: 0.5,
  bottom: 0,
  left: 0,
  width: 50,
  height: 50,
};

export const Decorations = () => (
  <div>
    <WrapperComponent
      theme={{
        background: "white",
        outerBackground: "black",
        text: "black",
        width: "inner",
        padding: { top: "xl", bottom: "xl" },
        margin: { top: "xl", bottom: "xl" },
      }}
      decorations={[
        { mobile: SQUARE },
        { mobile: SQUARE, location: "outside" },
        {
          mobile: {
            ...SQUARE,
            translateY: "-50%",
            translateX: "-50%",
            top: 0,
            bottom: "auto",
          },
          location: "inside",
          breakout: true,
        },
        {
          mobile: {
            ...SQUARE,
            translateY: "-50%",
            translateX: "-50%",
            top: 0,
            bottom: "auto",
          },
          location: "outside",
          breakout: true,
        },
      ]}
    >
      <div style={{ height: 100 }} />
    </WrapperComponent>
  </div>
);

export const Slots = () => (
  <WrapperComponent
    theme={{
      margin: {
        top: "xl",
        bottom: "xl",
      },
      padding: {
        top: "xl",
        bottom: "xl",
      },
      width: "outer",
    }}
    slots={{
      inside: <div className="border-2">inside</div>,
      insideBleed: <div className="border-2">insideBleed</div>,
      insideSpacing: <div className="border-2">insideSpacing</div>,
      insideWidth: <div className="border-2">insideWidth</div>,
      outside: <div className="border-2">outside</div>,
      outsideSpacing: <div className="border-2">outsideSpacing</div>,
    }}
  >
    children
  </WrapperComponent>
);
