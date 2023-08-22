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
      background: "black",
      title: "white",
      content: "white",
      name: "white",
      jobTitle: "white",
    }}
  />
);
