import {
  TextSizeType,
  TEXT_SIZE_OPTIONS,
} from "../../components/text/text.options";
import {
  TitleSizeType,
  TITLE_SIZE_OPTIONS,
} from "../../components/title/title.options";
import { COLORS } from "../../theme";
import {
  ColorType,
  HorizontalAlignType,
  HORIZONTAL_ALIGN_OPTIONS,
} from "../../types";
import { Block9, Block9Props } from "./Block9";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block9,
  title: "Blocks/Block9",
} as Meta;

const DEMO_CONTENT: Block9Props = {
  title: "We didn't reinvent the wheel",
  intro: (
    <p>
      We are strategists, designers and developers. Innovators and problem
      solvers. Small enough to be simple and quick, but big enough to deliver
      the scope you want at the pace you need.{" "}
    </p>
  ),
  buttons: [{ label: "Buy now" }],
  video: {
    provider: "youtube",
    videoId: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
};

export const Default = () => <Block9 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block9
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
          <Block9
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
        <Block9
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
        <Block9
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
        <Block9
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
        <Block9
          intro={DEMO_CONTENT.intro}
          theme={{
            intro: { size },
          }}
        />
      </div>
    ))}
  </>
);
