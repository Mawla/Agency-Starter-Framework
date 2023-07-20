import { Block0, Block0Props } from "./Block0";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Block0,
  title: "Blocks/Block0",
} as Meta;

const DEMO_CONTENT: Block0Props = {
  html: "<p>hello</p>",
};

export const Default = () => <Block0 {...DEMO_CONTENT} />;
