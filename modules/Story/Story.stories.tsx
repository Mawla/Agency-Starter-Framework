import { Meta } from "@storybook/react";
import React from "react";

import { SPACE_OPTIONS } from "../../components/module/SpacingOptions";
import { WidthType, WIDTH_OPTIONS } from "../../components/module/WidthOptions";
import { demoImage6, demoImage7 } from "../../stories/content";
import { Story } from "./Story";
import {
  StoryAlignType,
  StoryBackgroundColorType,
  STORY_ALIGN_OPTIONS,
  STORY_BACKGROUND_COLOR_OPTIONS,
} from "./StoryOptions";

export default {
  component: Story,
  title: "Modules/Story",
} as Meta;

const DEMO_CONTENT = {
  quote:
    "It feels like we’re not just coworkers. We’re really like Prima family here.",
  label: "Employee story",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a mattis tellus.",
  person: {
    name: "John Doe",
    position: "Employee",
  },
  image: demoImage6,
  videoLink: "/foo",
};

export const Default = () => <Story {...DEMO_CONTENT} />;

export const BackgroundImage = () => (
  <div>
    <Story {...DEMO_CONTENT} backgroundImage={demoImage7} image={null} />
    <Story
      {...DEMO_CONTENT}
      backgroundImage={demoImage7}
      image={null}
      text={null}
      theme={{ module: { width: "inner" } }}
    />
  </div>
);

export const Alignments = () => (
  <div>
    {(Object.keys(STORY_ALIGN_OPTIONS) as StoryAlignType[]).map(
      (align: StoryAlignType) => (
        <Story
          {...DEMO_CONTENT}
          theme={{
            image: { align },
          }}
        />
      )
    )}
  </div>
);

export const Widths = () => (
  <div>
    {(Object.keys(WIDTH_OPTIONS) as WidthType[]).map((width: WidthType) => (
      <Story
        theme={{
          module: { width },
        }}
        {...DEMO_CONTENT}
      />
    ))}
  </div>
);

export const ModuleSpacing = () => (
  <>
    {(
      Object.entries(SPACE_OPTIONS) as [
        key: keyof typeof SPACE_OPTIONS,
        label: string
      ][]
    ).map(([size, label]) => (
      <>
        <div key={size} className="border">
          <Story
            {...DEMO_CONTENT}
            theme={{ module: { space: { top: size, bottom: size } } }}
          />
        </div>
        <div key={size} className="border">
          <Story
            {...DEMO_CONTENT}
            theme={{
              module: {
                width: "inner",
                space: { top: size, bottom: size },
              },
            }}
          />
        </div>
        <div key={size} className="border">
          <Story
            {...DEMO_CONTENT}
            theme={{
              module: {
                space: { top: size, bottom: size },
              },
            }}
          />
        </div>
      </>
    ))}
  </>
);

export const ModuleBackgrounds = () => (
  <>
    {(
      Object.keys(STORY_BACKGROUND_COLOR_OPTIONS) as StoryBackgroundColorType[]
    ).map((color: StoryBackgroundColorType) => (
      <Story
        key={color}
        {...DEMO_CONTENT}
        theme={{
          module: {
            background: color,
          },
        }}
      />
    ))}
  </>
);
