import { Title } from "./Title";
import { TITLE_SIZE_OPTIONS, TITLE_WEIGHT_OPTIONS } from "./title.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Title,
  title: "Components/Title",
} as Meta;

export const Default = () => (
  <Title
    as="span"
    size="lg"
    weight="bold"
    className="border"
    color="black"
    font="heading"
  >
    this is a title
  </Title>
);

export const TitleExample = () => (
  <>
    <div className="mb-10">
      <Title>Products</Title>
    </div>
    <div className="mb-10">
      <Title>Upcoming webinar announcement</Title>
    </div>
    <div className="mb-10">
      <Title>Ready to dive in? Start your free trial.</Title>
    </div>
  </>
);

export const TitleAsSpan = () => (
  <Title as="span">Ready to dive in? Start your free trial.</Title>
);

export const Sizes = () => (
  <div>
    {(
      Object.entries(TITLE_SIZE_OPTIONS) as [
        key: keyof typeof TITLE_SIZE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="mb-10 flex flex-col">
        <span>{size}</span>
        <Title size={size}>Ready to dive in? Start your free trial.</Title>
      </div>
    ))}
  </div>
);

export const Weights = () => (
  <div>
    {(
      Object.entries(TITLE_WEIGHT_OPTIONS) as [
        key: keyof typeof TITLE_WEIGHT_OPTIONS,
        label: string,
      ][]
    ).map(([weight, label]) => (
      <div key={label} className="mb-10">
        <Title size="xl" weight={weight}>
          {weight}
        </Title>
      </div>
    ))}
  </div>
);
