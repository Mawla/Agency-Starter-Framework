import { demoImage2 } from "../../stories/content";
import { SimpleImage } from "./SimpleImage";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: SimpleImage,
  title: "Components/SimpleImage",
} as Meta;

export const Default = () => (
  <SimpleImage {...demoImage2} width={100} height={100} />
);

export const Fill = () => (
  <div className="relative aspect-video border">
    <SimpleImage {...demoImage2} priority loading="eager" fill />
  </div>
);

export const Zoom = () => (
  <div className="relative aspect-video border">
    <SimpleImage {...demoImage2} priority loading="eager" fill zoom />
  </div>
);
