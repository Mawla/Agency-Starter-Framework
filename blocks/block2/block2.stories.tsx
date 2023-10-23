import {
  TextSizeType,
  TEXT_SIZE_OPTIONS,
} from "../../components/text/text.options";
import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
import { demoImage } from "../../stories/content";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
} from "../../types";
import { Block2 } from "./Block2";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block2,
  title: "Blocks/2. Feature Section with Icons",
} as Meta;

const DEMO_CONTENT = {
  title: "Designed for business teams like yours",
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
  buttons: [{ label: "Get started" }],
};

export const Default = () => <Block2 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block2
          {...DEMO_CONTENT}
          theme={{
            block: { background: color },
          }}
        />
      </div>
    ))}
  </>
);

export const TitleColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
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
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
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
    {(Object.keys(TEXT_SIZE_OPTIONS) as TextSizeType[]).map((size) => (
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

export const Alignments = () => (
  <>
    {(Object.keys(HORIZONTAL_ALIGN_OPTIONS) as HorizontalAlignType[]).map(
      (align) => (
        <div key={align}>
          <Block2
            {...DEMO_CONTENT}
            theme={{
              block: { align },
            }}
          />
        </div>
      ),
    )}
  </>
);

export const ItemsTheme = () => (
  <>
    <Block2
      {...DEMO_CONTENT}
      items={DEMO_CONTENT.items.map((x) => ({
        ...x,
        theme: {
          title: {
            color: "white",
            size: "4xl",
          },
          intro: {
            color: "white",
            size: "xl",
          },
        },
      }))}
      theme={{
        block: {
          background: "white",
        },
        items: {
          background: "black",
        },
      }}
    />
  </>
);
