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
import { Block3, Block3Props } from "./Block3";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block3,
  title: "Blocks/3. Pricing Plans",
} as Meta;

const DEMO_CONTENT: Block3Props = {
  title: "title",
  intro: <p>intro</p>,
};

export const Default = () => <Block3 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block3
          {...DEMO_CONTENT}
          theme={{
            block: { background: color },
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
          <Block3
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

export const TitleColors = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block3
          title={DEMO_CONTENT.title}
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
          title={DEMO_CONTENT.title}
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
        <Block3
          intro={DEMO_CONTENT.intro}
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
        <Block3
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);

export const Theme = () => (
  <Block3
    intro={DEMO_CONTENT.intro}
    plans={[
      {
        title: "Plan A",
        description: "Description",
        price: {
          amount: "¢100",
          unit: "per month",
        },
        features: <p>Features</p>,
        buttons: [{ label: "Button" }],
      },
    ]}
    theme={{
      plans: {
        card: {
          color: "white",
          background: "black",
          padding: "10",
        },
        title: {
          color: "white",
          size: "xl",
        },
        amount: {
          color: "white",
          size: "xl",
        },
        unit: {
          color: "white",
          size: "xl",
        },
        description: {
          color: "white",
          size: "xl",
        },
        features: {
          color: "white",
          size: "xl",
        },
        border: {
          color: "black",
          radius: "xl",
          width: 2,
        },
      },
    }}
  />
);

export const Columns = () => (
  <div className="grid gap-10">
    <Block3 intro={DEMO_CONTENT.intro} plans={[{ title: "Plan A" }]} />
    <Block3
      intro={DEMO_CONTENT.intro}
      plans={[{ title: "Plan A" }, { title: "Plan B" }]}
    />
    <Block3
      intro={DEMO_CONTENT.intro}
      plans={[{ title: "Plan A" }, { title: "Plan B" }, { title: "Plan C" }]}
    />
    <Block3
      intro={DEMO_CONTENT.intro}
      plans={[
        { title: "Plan A" },
        { title: "Plan B" },
        { title: "Plan C" },
        { title: "Plan D" },
      ]}
    />
    <Block3
      intro={DEMO_CONTENT.intro}
      plans={[
        { title: "Plan A" },
        { title: "Plan B" },
        { title: "Plan C" },
        { title: "Plan D" },
        { title: "Plan E" },
      ]}
    />
    <Block3
      intro={DEMO_CONTENT.intro}
      plans={[
        { title: "Plan A" },
        { title: "Plan B" },
        { title: "Plan C" },
        { title: "Plan D" },
        { title: "Plan E" },
        { title: "Plan F" },
      ]}
    />
  </div>
);
