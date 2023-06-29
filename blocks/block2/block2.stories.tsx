import { demoImage } from "../../stories/content";
import { Block2 } from "./Block2";
import {
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  IntroColorType,
  IntroSizeType,
  INTRO_COLOR_OPTIONS,
  INTRO_SIZE_OPTIONS,
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

const DEMO_CONTENT = {
  title: "Designed for business teams like yours\n",
  image: demoImage,
  intro: (
    <p>
      Here we focus on markets where technology, innovation, and capital can
      unlock long-term value and drive economic growth.
    </p>
  ),
  items: [
    {
      title: "Automatic categorization",
      intro: (
        <p>
          Flow Budget automatically categorizes your income and expenses, making
          it easy to track where your money is going.
        </p>
      ),
      image: demoImage,
    },
    {
      title: "Budget goals",
      intro: (
        <p>
          Set budget goals for each category and get real-time updates on how
          close you are to reaching them.
        </p>
      ),
      image: demoImage,
    },
    {
      title: "Cloud synchronization",
      intro: (
        <p>
          Synch your data across multiple devices, so you can access your budget
          and expenses from anywhere, at any time, and on any device.
        </p>
      ),
      image: demoImage,
    },
    {
      title: "Budgeting methods",
      intro: (
        <p>
          The app offers a variety of budgeting methods, such as 50/30/20 rule,
          to help users find the approach that works best for them.
        </p>
      ),
      image: demoImage,
    },
  ],
};

export const Default = () => <Block2 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block2
            {...DEMO_CONTENT}
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
          {...DEMO_CONTENT}
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
          {...DEMO_CONTENT}
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
          {...DEMO_CONTENT}
          theme={{
            intro: { color },
          }}
        />
      </div>
    ))}
  </>
);

export const IntroSizes = () => (
  <>
    {(Object.keys(INTRO_SIZE_OPTIONS) as IntroSizeType[]).map((size) => (
      <div key={size}>
        <Block2
          {...DEMO_CONTENT}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);
