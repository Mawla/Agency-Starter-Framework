import { demoImage } from "../../stories/content";
import { Block2 } from "./Block2";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  IntroColorType,
  INTRO_COLOR_OPTIONS,
  TitleColorType,
  TitleSizeType,
  TITLE_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "./block2.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block2,
  title: "Blocks/Block2",
} as Meta;

export const Default = () => (
  <Block2
    title="Block2"
    intro={<p>Block2</p>}
    buttons={[{ label: "Block2" }]}
    items={[{ title: "Block2" }]}
  />
);

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block2
            title="Block2"
            theme={{
              block: { background: color },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const TitleColors = () => (
  <>
    {(Object.keys(TITLE_COLOR_OPTIONS) as TitleColorType[]).map((color) => (
      <div key={color}>
        <Block2
          title="Block2"
          theme={{
            title: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const TitleSizes = () => (
  <>
    {(Object.keys(TITLE_SIZE_OPTIONS) as TitleSizeType[]).map((size) => (
      <div key={size}>
        <Block2
          title="Block2"
          theme={{
            title: { size },
          }}
        />
      </div>
    ))}
  </>
);

export const IntroColors = () => (
  <>
    {(Object.keys(INTRO_COLOR_OPTIONS) as IntroColorType[]).map((color) => (
      <div key={color}>
        <Block2
          intro={<p>Block2</p>}
          theme={{
            intro: { color },
          }}
        />
      </div>
    ))}
  </>
);
