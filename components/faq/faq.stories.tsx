import { demoFAQList } from "../../stories/content";
import { FAQ, FAQProps } from "./FAQ";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: FAQ,
  title: "Components/FAQ",
} as Meta;

export const Default = () => <FAQ items={demoFAQList} />;

export const Colors = () => (
  <FAQ
    items={demoFAQList}
    theme={{
      title: "white",
      icon: "white",
      background: "black",
      divider: "white",
    }}
  />
);
