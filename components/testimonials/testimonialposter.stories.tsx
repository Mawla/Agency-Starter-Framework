import { demoTestimonialsList } from "../../stories/content";
import { TestimonialPoster } from "./TestimonialPoster";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: TestimonialPoster,
  title: "Components/Testimonials/Card",
} as Meta;

export const Card = () => <TestimonialPoster {...demoTestimonialsList[0]} />;

export const Theme = () => (
  <TestimonialPoster
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
