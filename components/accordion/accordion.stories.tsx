import { demoFAQList } from "../../stories/content";
import { Accordion } from "./Accordion";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Accordion,
  title: "Components/Accordion",
} as Meta;

export const Default = () => <Accordion items={demoFAQList} />;

export const Colors = () => (
  <Accordion
    items={demoFAQList}
    theme={{
      title: "white",
      icon: "white",
      background: "black",
      divider: "white",
    }}
  />
);