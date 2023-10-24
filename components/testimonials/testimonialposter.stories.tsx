import { demoTestimonialsList } from "../../stories/content";
import { TestimonialPoster } from "./TestimonialPoster";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: TestimonialPoster,
  title: "Components/Testimonials/Poster",
} as Meta;

export const Poster = () => <TestimonialPoster {...demoTestimonialsList[0]} />;

export const ShortName = () => (
  <TestimonialPoster
    {...demoTestimonialsList[0]}
    name="Bonnie Green"
    jobTitle="CTO"
  />
);
export const LongName = () => (
  <TestimonialPoster
    {...demoTestimonialsList[0]}
    name="Bonnie Bonnie Bonnie Green Blue Red"
    jobTitle="CTO at Open AI CTO at Open AI CTO at Open AI"
  />
);

export const Theme = () => (
  <TestimonialPoster
    {...demoTestimonialsList[0]}
    theme={{
      jobTitle: {
        color: "black",
        size: "xl",
        weight: "normal",
      },
      name: {
        color: "black",
        size: "xl",
        weight: "semibold",
      },
      title: {
        color: "black",
        size: "xl",
      },
      content: {
        size: "4xl",
        weight: "normal",
        color: "black",
      },
    }}
  />
);
