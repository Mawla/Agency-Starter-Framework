import { MobileScroller } from "./MobileScroller";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: MobileScroller,
  title: "Components/MobileScroller",
} as Meta;

export const Default = () => (
  <MobileScroller className="flex gap-10">
    <div className="shrink-0 w-[300px] h-10 bg-[red] snap-center" />
    <div className="shrink-0 w-[300px] h-10 bg-[red] snap-center" />
    <div className="shrink-0 w-[300px] h-10 bg-[red] snap-center" />
    <div className="shrink-0 w-[300px] h-10 bg-[red] snap-center" />
    <div className="shrink-0 w-[300px] h-10 bg-[red] snap-center" />
    <div className="shrink-0 w-[300px] h-10 bg-[red] snap-center" />
  </MobileScroller>
);
