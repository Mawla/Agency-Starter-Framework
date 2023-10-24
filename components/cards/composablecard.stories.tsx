import {
  TITLE_SIZE_OPTIONS,
  TitleSizeType,
} from "../../components/title/title.options";
import { demoIcon1, demoImage } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  BORDER_RADIUS_OPTIONS,
  BorderRadiusType,
  ColorType,
  HORIZONTAL_ALIGN_OPTIONS,
  HorizontalAlignType,
  RATIOS,
  RatioType,
} from "../../types";
import { ComposableCard, ComposableCardProps } from "./ComposableCard";
import {
  IMAGE_HEIGHT_OPTIONS,
  ImageHeightType,
} from "./composablecard.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: ComposableCard,
  title: "Blocks/18. Card Grid/ComposableCard",
} as Meta;

const SQUARE = {
  background: "blue",
  opacity: 0.5,
  bottom: 0,
  left: 0,
  width: 50,
  height: 50,
};

const DEMO_CONTENT = {
  type: "card.composable",
  title: "Title",
  subtitle: "subtitle",
  content: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
      molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
      accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus
      ipsum dolor.
    </p>
  ),
  buttons: [{ label: "button" }],
  image: demoIcon1,
} as ComposableCardProps;

export const Default = () => (
  <ComposableCard
    {...DEMO_CONTENT}
    buttons={[
      {
        label: "Button",
        theme: { mobile: { background: { color: "white" } } },
      },
    ]}
    theme={{
      border: {
        color: "black",
        width: 2,
        radius: "xl",
      },
      card: {
        background: "black",
        paddingX: "10",
        paddingTop: "10",
        paddingBottom: "10",
      },
      title: {
        color: "white",
        font: "serif",
        size: "lg",
        weight: "bold",
      },
      subtitle: {
        color: "white",
        font: "serif",
        size: "lg",
        weight: "bold",
      },
      content: {
        color: "white",
        font: "serif",
        size: "lg",
        weight: "bold",
      },
    }}
    decorations={[{ mobile: SQUARE }, { mobile: SQUARE, location: "outside" }]}
  />
);

export const BackgroundColors = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <ComposableCard
          type="card.composable"
          title="title"
          content={<p>content</p>}
          theme={{
            card: { background: color },
          }}
        />
      </div>
    ))}
  </div>
);

export const BorderColors = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <ComposableCard
          type="card.composable"
          title="title"
          content={<p>content</p>}
          theme={{
            border: { color },
          }}
        />
      </div>
    ))}
  </div>
);

export const TitleColors = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <ComposableCard
          type="card.composable"
          title="Title"
          theme={{
            title: { color },
          }}
        />
      </div>
    ))}
  </div>
);

export const TitleSizes = () => (
  <div className="grid grid-cols-5">
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map((size) => (
      <div key={size}>
        <ComposableCard
          type="card.composable"
          title="Title"
          theme={{
            title: { size },
          }}
        />
      </div>
    ))}
  </div>
);

export const ContentColors = () => (
  <div className="grid grid-cols-5 gap-2">
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <ComposableCard
          type="card.composable"
          content={<p>content</p>}
          theme={{
            content: { color },
          }}
        />
      </div>
    ))}
  </div>
);

export const ContentSizes = () => (
  <div className="grid grid-cols-5">
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map((size) => (
      <div key={size}>
        <ComposableCard
          type="card.composable"
          content={<p>content</p>}
          theme={{
            content: { size },
          }}
        />
      </div>
    ))}
  </div>
);

export const Alignments = () => (
  <div className="grid grid-cols-5">
    {(Object.keys(HORIZONTAL_ALIGN_OPTIONS) as HorizontalAlignType[]).map(
      (align) => (
        <div key={align}>
          <ComposableCard
            {...DEMO_CONTENT}
            theme={{
              card: { align },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const ImageSizes = () => (
  <div className="grid grid-cols-5">
    {(Object.keys(IMAGE_HEIGHT_OPTIONS) as ImageHeightType[]).map((height) => (
      <div key={height}>
        <ComposableCard
          type="card.composable"
          image={demoImage}
          theme={{
            image: { height },
          }}
        />
      </div>
    ))}
  </div>
);

export const ImageRounded = () => (
  <div className="grid grid-cols-5">
    {(Object.keys(BORDER_RADIUS_OPTIONS) as BorderRadiusType[]).map(
      (rounded) => (
        <div key={rounded}>
          <ComposableCard
            type="card.composable"
            image={demoImage}
            theme={{
              image: { rounded, height: "xl" },
            }}
          />
        </div>
      ),
    )}
  </div>
);

export const ImageRatios = () => (
  <div className="grid grid-cols-5">
    {(Object.keys(RATIOS) as RatioType[]).map((ratio) => (
      <div key={ratio}>
        <ComposableCard
          type="card.composable"
          image={demoImage}
          theme={{
            image: { ratio },
          }}
        />
      </div>
    ))}
  </div>
);

export const Clickable = () => (
  <div className="grid grid-cols-4 gap-20">
    <ComposableCard
      type="card.composable"
      title="Card clickable if single button"
      buttons={[{ label: "click me", href: "/" }]}
      theme={{
        border: {
          width: 1,
          color: "black",
        },
      }}
    />
    <ComposableCard
      type="card.composable"
      title="Card clickable, buttons hidden"
      buttons={[{ label: "click me", href: "/" }]}
      theme={{
        buttons: { hidden: true },
        border: {
          width: 1,
          color: "black",
        },
      }}
    />
    <ComposableCard
      type="card.composable"
      title="Card not clickable"
      subtitle="when there is more than 1 button"
      buttons={[
        { label: "click me", href: "/" },
        { label: "click me 2", href: "/" },
      ]}
      theme={{
        border: {
          width: 1,
          color: "black",
        },
      }}
    />
    <ComposableCard
      type="card.composable"
      title="Card not clickable (multiple buttons), buttons hidden"
      buttons={[
        { label: "click me", href: "/" },
        { label: "click me2", href: "/" },
      ]}
      theme={{
        buttons: { hidden: true },
        border: {
          width: 1,
          color: "black",
        },
      }}
    />
  </div>
);
