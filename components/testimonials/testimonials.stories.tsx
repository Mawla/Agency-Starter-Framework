import { demoTestimonialsList } from "../../stories/content";
import { Testimonials, TestimonialsProps } from "./Testimonials";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Testimonials,
  title: "Components/Testimonials",
} as Meta;

export const Default = () => (
  <Testimonials
    items={demoTestimonialsList}
    RenderElement={(props) => <pre>{JSON.stringify(props, null, 2)}</pre>}
  />
);

export const Card = () => (
  <Testimonials
    items={demoTestimonialsList}
    RenderElement={(props) => <div className="border p-10">{props.title}</div>}
  />
);
