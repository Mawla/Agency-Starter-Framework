import { demoImage } from "../../stories/content";
import { Block6 } from "./Block6";
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
} from "./block6.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block6,
  title: "Blocks/Block6",
} as Meta;

const DEMO_CONTENT = {
  title: "Designed for business teams like yours ",
  intro: (
    <p>
      Here at Flowbite we focus on markets where technology, innovation, and
      capital can unlock long-term value and drive economic growth.{" "}
    </p>
  ),

  buttons: [{ label: "Button" }],
  items: [
    {
      image: demoImage,
      title: "Marketing",
      intro: (
        <p>
          Plan it, create it, launch it. Collaborate seamlessly with all the
          organization and hit your marketing goals every month with our
          marketing plan.
        </p>
      ),
    },
    {
      image: demoImage,
      title: "Legal",
      intro: (
        <p>
          Protect your organization, devices and stay compliant with our
          structured workflows and custom permissions made for you.
        </p>
      ),
    },
    {
      image: demoImage,
      title: "Business Automation",
      intro: (
        <p>
          Auto-assign tasks, send Slack messages, and much more. Now power up
          with hundreds of new templates to help you get started.
        </p>
      ),
    },
    {
      image: demoImage,
      title: "Finance",
      intro: (
        <p>
          Audit-proof software built for critical financial operations like
          month-end close and quarterly budgeting.
        </p>
      ),
    },
    {
      image: demoImage,
      title: "Enterprise Design",
      intro: (
        <p>
          Craft beautiful, delightful experiences for both marketing and product
          with real cross-company collaboration.
        </p>
      ),
    },
    {
      image: demoImage,
      title: "Operations",
      intro: (
        <p>
          Keep your company’s lights on with customizable, iterative, and
          structured workflows built for all efficient teams and individual.
        </p>
      ),
    },
  ],
};

export const Default = () => <Block6 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(BACKGROUND_COLOR_OPTIONS) as BackgroundColorType[]).map(
      (color) => (
        <div key={color}>
          <Block6
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
        <Block6
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
        <Block6
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
        <Block6
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
        <Block6
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
        <Block6
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);
