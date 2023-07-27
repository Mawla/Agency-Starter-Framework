import { demoResourceCards } from "../../stories/content";
import { ResourceCard } from "./ResourceCard";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: ResourceCard,
  title: "Components/ResourceCard",
} as Meta;

export const Default = () => (
  <div className="w-[400px]">
    <ResourceCard {...demoResourceCards[3]} />
  </div>
);

export const Theme = () => (
  <div className="w-[400px]">
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
