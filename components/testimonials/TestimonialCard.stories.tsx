import { demoTestimonialsList } from "../../stories/content";
import { TestimonialCard } from "./TestimonialCard";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: TestimonialCard,
  title: "Components/Testimonials/Card",
} as Meta;

export const Card = () => <TestimonialCard {...demoTestimonialsList[0]} />;
