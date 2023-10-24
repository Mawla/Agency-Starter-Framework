import { demoImage2 } from "../../stories/content";
import { RATIOS, RatioType } from "../../types";
import { ImageCard } from "./ImageCard";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: ImageCard,
  title: "Blocks/18. Card Grid/ImageCard",
} as Meta;

export const Ratios = () => (
  <div className="grid grid-cols-3 gap-10">
    {(Object.keys(RATIOS) as RatioType[]).map((ratio: RatioType) => (
      <div className="relative" key={ratio}>
        <span className="absolute left-6 top-6 bg-white py-2 px-4 z-10 rounded-full">
          {ratio}
        </span>
        <ImageCard image={demoImage2} theme={{ image: { ratio } }} />
      </div>
    ))}
  </div>
);
