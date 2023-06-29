import { demoImage } from "../../stories/content";
import { Block3 } from "./Block3";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  IntroColorType,
  INTRO_COLOR_OPTIONS,
  TitleColorType,
  TitleSizeType,
  TITLE_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "./block3.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block3,
  title: "Blocks/Block3",
} as Meta;

export const Default = () => (
  <Block3
    title="Block3"
    intro={<p>Block3</p>}
    image={demoImage}
    buttons={[{ label: "Block3" }]}
  />
);

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block3
            title="Block3"
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
        <Block3
          title="Block3"
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
        <Block3
          title="Block3"
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
        <Block3
          intro={<p>Block3</p>}
          theme={{
            intro: { color },
          }}
        />
      </div>
    ))}
  </>
);
