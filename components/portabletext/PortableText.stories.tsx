import { demoPortableTextArticle } from "../../stories/content";
import PortableText from "./PortableText";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: PortableText,
  title: "components/PortableText",
} as Meta;

export const Default = () => <PortableText content={demoPortableTextArticle} />;
