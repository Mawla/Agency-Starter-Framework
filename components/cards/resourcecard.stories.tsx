import { demoResourceCards } from "../../stories/content";
import { ResourceCard } from "./ResourceCard";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: ResourceCard,
  title: "Blocks/18. Card Grid/ResourceCard",
} as Meta;

export const Default = () => (
  <div className="flex flex-wrap gap-10">
    <div className="w-[300px]">
      <ResourceCard {...demoResourceCards[0]} />
    </div>
    <div className="w-[300px]">
      <ResourceCard {...demoResourceCards[2]} />
    </div>
    <div className="w-[300px]">
      <ResourceCard {...demoResourceCards[3]} />
    </div>
  </div>
);

export const Theme = () => (
  <div className="w-[300px]">
    <ResourceCard
      {...demoResourceCards[3]}
      theme={{
        background: "black",
        border: "black",
        title: "white",
        text: "white",
        tag: "white",
        author: "white",
        date: "white",
      }}
    />
  </div>
);
