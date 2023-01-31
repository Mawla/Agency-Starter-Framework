import {
  SpaceTopType,
  SpaceType,
  SPACE_OPTIONS,
} from "../../components/module/SpacingOptions";
import { demoImage2 } from "../../stories/content";
import { TextImage } from "./TextImage";
import {
  ImageAlignType,
  IMAGE_ALIGN_OPTIONS,
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  ImageColorType,
  IMAGE_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
  TitleSizeType,
} from "./TextImageOptions";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: TextImage,
  title: "Modules/TextImage",
} as Meta;

export const Default = () => (
  <TextImage
    eyebrow="hello"
    title="Hello"
    intro={<p>Hello</p>}
    buttons={[{ label: "hello" }]}
    image={demoImage2}
  />
);

export const LongContent = () => (
  <TextImage
    eyebrow="Descriptive statement lorem ipsum dolor Descriptive statement lorem ipsum dolor"
    title="Descriptive statement lorem ipsum dolor Descriptive statement lorem ipsum dolor"
    intro={
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit.
        </p>
      </>
    }
    buttons={[{ label: "hello" }, { label: "hello" }, { label: "hello" }]}
    image={demoImage2}
  />
);

export const ImageColors = () => (
  <>
    {(Object.keys(IMAGE_COLOR_OPTIONS) as ImageColorType[]).map(
      (background: ImageColorType) => (
        <div key={background} className="mb-10 border">
          <TextImage
            title="Text image"
            eyebrow={background}
            theme={{ image: { background } }}
            image={demoImage2}
          />
        </div>
      ),
    )}
  </>
);

export const Align = () => (
  <>
    {(Object.keys(IMAGE_ALIGN_OPTIONS) as ImageAlignType[]).map(
      (align: ImageAlignType) => (
        <div key={align} className="mb-10 border">
          <TextImage
            title="Text image"
            eyebrow={align}
            theme={{ image: { align } }}
            image={demoImage2}
          />
        </div>
      ),
    )}
  </>
);

export const Backgrounds = () => (
  <>
    <div className="mb-10 border">
      <TextImage title="Text image" eyebrow="none" />
    </div>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (background: BackgroundColorType) => (
        <div key={background} className="mb-10 border">
          <TextImage
            title="Text image"
            eyebrow={background}
            theme={{ module: { background } }}
          />
        </div>
      ),
    )}
  </>
);

export const Rounded = () => (
  <div className="flex flex-col gap-10">
    <TextImage
      title="Default"
      theme={{
        module: { background: "brand-base" },
      }}
    />
    <TextImage
      title="Square"
      theme={{
        module: { background: "brand-base" },
        decorations: { roundedTop: "none", roundedBottom: "none" },
      }}
    />
    <TextImage
      title="Top rounded"
      theme={{
        module: { background: "brand-base" },
        decorations: { roundedTop: "lg", roundedBottom: "none" },
      }}
    />
    <TextImage
      title="Bottom rounded"
      theme={{
        module: { background: "brand-base" },
        decorations: { roundedTop: "none", roundedBottom: "lg" },
      }}
    />
  </div>
);

export const Spacing = () => (
  <>
    {(Object.keys(SPACE_OPTIONS) as SpaceTopType[]).map(
      (space: SpaceTopType) => (
        <div key={space} className="mb-10 border">
          <TextImage
            title="Text image"
            eyebrow={space}
            theme={{
              module: {
                background: "neutral-95",
                space: { top: space, bottom: space },
              },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const TitleSizes = () => (
  <>
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map(
      (size: TitleSizeType) => (
        <div key={size} className="mb-10 border">
          <TextImage
            title="Text image"
            eyebrow={size}
            theme={{
              title: {
                size,
              },
            }}
          />
        </div>
      ),
    )}
  </>
);
