import { demoTestimonialsList } from "../../stories/content";
import { TestimonialCard } from "./TestimonialCard";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: TestimonialCard,
  title: "Components/Testimonials/Card",
} as Meta;

export const Card = () => (
  <TestimonialCard {...demoTestimonialsList[0]} type="card.testimonial" />
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
