import { demoImage } from "../../stories/content";
import { Block10, Block10Props } from "./Block10";
import {
  AlignType,
  ALIGN_OPTIONS,
  BackgroundColorType,
  BACKGROUND_COLOR_OPTIONS,
  IntroColorType,
  INTRO_COLOR_OPTIONS,
  IntroSizeType,
  INTRO_SIZE_OPTIONS,
  TitleColorType,
  TitleSizeType,
  TITLE_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
} from "./block10.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block10,
  title: "Blocks/Block10",
} as Meta;

const DEMO_CONTENT: Block10Props = {
  title: "Frequently asked questions ",
  intro: (
    <p>
      Ask us anything about our brand and products, and get factual responses.
    </p>
  ),

  faq: [
    {
      title: "What is the best thing about Switzerland?",
      content: [
        {
          _key: "1bc91c6df8b3",
          _type: "block",
          children: [
            {
              _key: "9dc1274a39d5",
              _type: "span",
              marks: [],
              text: "We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.",
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
    },
    {
      title:
        "Did you hear about the mathematician who's afraid of negative numbers?",
      content: <p>He'll stop at nothing to avoid them!</p>,
    },
    {
      title: "Hear about the new restaurant called Karma?",
      content: <p>There’s no menu: You get what you deserve.</p>,
    },
    {
      title: "Did you hear about the actor who fell through the floorboards?",
      content: <p>He was just going through a stage.</p>,
    },
    {
      title: "Did you hear about the claustrophobic astronaut?",
      content: <p>He just needed a little space.</p>,
    },
  ],
  buttons: [{ label: "Read more" }],
};

export const Default = () => <Block10 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block10
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

export const Alignments = () => (
  <>
    {(Object.keys(ALIGN_OPTIONS) as AlignType[]).map((align) => (
      <div key={align}>
        <Block10
          {...DEMO_CONTENT}
          theme={{
            block: { align },
          }}
        />
      </div>
    ))}
  </>
);

export const TitleColors = () => (
  <>
    {(Object.keys(TITLE_COLOR_OPTIONS) as TitleColorType[]).map((color) => (
      <div key={color}>
        <Block10
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
        <Block10
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
    {(Object.keys(INTRO_COLOR_OPTIONS) as IntroColorType[]).map((color) => (
      <div key={color}>
        <Block10
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
    {(Object.keys(INTRO_SIZE_OPTIONS) as IntroSizeType[]).map((size) => (
      <div key={size}>
        <Block10
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);
