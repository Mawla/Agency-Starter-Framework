import { SocialShare } from "./SocialShare";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: SocialShare,
  title: "Components/SocialShare",
} as Meta;

export const Default = () => (
  <>
    <SocialShare title="hello" direction="horizontal" />
    <SocialShare title="hello" direction="vertical" />
  </>
);
