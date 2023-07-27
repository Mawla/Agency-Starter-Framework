import { COLORS } from "../../theme";
import { ColorType } from "../../types";
import { Block14, Block14Props } from "./Block14";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block14,
  title: "Blocks/Block14",
} as Meta;

const DEMO_CONTENT: Block14Props = {
  title: "title",
  body: <p>intro</p>,
};

export const Default = () => <Block14 {...DEMO_CONTENT} />;

export const BlockBackgrounds = () => (
  <>
    {(Object.keys(COLORS) as ColorType[]).map((color) => (
      <div key={color}>
        <Block14
          {...DEMO_CONTENT}
          theme={{
            block: { background: color },
          }}
        />
      </div>
    ))}
  </>
);
