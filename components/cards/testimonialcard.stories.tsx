import { demoTestimonialsList } from "../../stories/content";
import { TestimonialCard } from "./TestimonialCard";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: TestimonialCard,
  title: "Blocks/18. Card Grid/TestimonialCard",
} as Meta;

export const Card = () => (
  <TestimonialCard {...demoTestimonialsList[0]} type="card.testimonial" />
);

export const Poster = () => (
  <TestimonialCard
    {...demoTestimonialsList[0]}
    type="card.testimonial"
    theme={{
      card: {
        align: "center",
        background: "white",
        columns: 3,
        paddingBottom: "20",
        paddingTop: "20",
        paddingX: "8",
      },
      border: {
        width: 1,
      },
      title: {
        weight: "medium",
        font: "heading",
        as: "h2",
        size: "6xl",
      },
      content: {
        size: "2xl",
        weight: "medium",
        font: "text",
      },
      jobTitle: {
        font: "text",
        size: "lg",
        weight: "normal",
      },
      name: {
        size: "lg",
        weight: "medium",
        font: "text",
      },
    }}
  />
);

export const Theme = () => (
  <TestimonialCard
    type="card.testimonial"
    {...demoTestimonialsList[0]}
    theme={{
      card: { background: "black", color: "white" },
      title: {
        size: "4xl",
      },
      content: { size: "4xl" },
      name: { size: "4xl" },
      jobTitle: { size: "4xl" },
    }}
  />
);
