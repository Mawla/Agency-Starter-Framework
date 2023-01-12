import { Meta } from "@storybook/react";
import React from "react";

import { Button } from "./Button";
import { SIZE_OPTIONS, VariantType, VARIANT_OPTIONS } from "./ButtonOptions";

export default {
  component: Button,
  title: "Components/Button",
} as Meta;

export const Variants = () => (
  <>
    {(Object.keys(VARIANT_OPTIONS) as VariantType[]).map(
      (variant: VariantType) => (
        <div key={variant} className="flex gap-2 mb-10">
          <Button label={variant} variant={variant} />
          <Button label="loading" variant={variant} loading />
          <Button label="disabled" variant={variant} disabled />
          <Button label="alt" variant={variant} alt />
        </div>
      )
    )}
  </>
);

export const Sizes = () => (
  <div className="flex flex-col gap-2 flex-wrap">
    {(
      Object.entries(SIZE_OPTIONS) as [
        key: keyof typeof SIZE_OPTIONS,
        label: string
      ][]
    ).map(([size, label]) => (
      <div key={label} className="flex gap-2 mr-2 mb-2">
        <Button label={label} size={size} />
        <Button label={label} size={size} loading />
        <Button label={label} size={size} disabled />
        <Button
          label="This is a very very very very looooooong button label"
          size={size}
        />
      </div>
    ))}
  </div>
);

export const AsButton = () => <Button label="Button text" as="button" />;

export const AsLink = () => (
  <Button label="Button text" as="a" href="https://www.google.com" />
);

export const AsDiv = () => <Button label="Button text" as="div" icon="arrow" />;

export const IconAfter = () => (
  <Button label="Read more" icon="arrow" iconPosition="after" />
);

export const IconBefore = () => (
  <Button label="Button text" icon="demo" iconPosition="before" />
);

export const IconOnly = () => (
  <>
    {(
      Object.entries(SIZE_OPTIONS) as [
        key: keyof typeof SIZE_OPTIONS,
        label: string
      ][]
    ).map(([size, label]) => (
      <div key={label} className="flex gap-2 mr-2 mb-2">
        <Button
          size={size}
          ariaLabel="Button text"
          icon="demo"
          iconPosition="before"
        />
        <Button
          size={size}
          ariaLabel="Button text"
          icon="demo"
          iconPosition="before"
          compact
        />
      </div>
    ))}
  </>
);

export const OrphanIcons = () => (
  <div
    style={{ maxWidth: 200 }}
    className="grid gap-4 border border-blue-500 p-0.5"
  >
    <Button label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " />

    <Button
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
      icon="demo"
      iconPosition="before"
    />
    <Button
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
      icon="demo"
      iconPosition="after"
    />
    <Button
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
      icon="demo"
      iconPosition="after"
    />
  </div>
);

export const Target = () => (
  <div
    style={{ maxWidth: 200 }}
    className="grid gap-4 border border-blue-500 p-0.5"
  >
    <Button label="External" target="_blank" href="https://www.google.com" />
    <Button label="Internal" href="https://www.google.com" />
    <Button
      label="External with icon"
      href="https://www.google.com"
      icon="close"
      target="_blank"
    />
    <Button
      label="External with icon"
      href="https://www.google.com"
      icon="close"
      iconPosition="before"
      target="_blank"
    />
    <Button
      label="External with icon"
      href="https://www.google.com"
      icon="close"
      iconPosition="after"
      target="_blank"
    />
    <Button href="https://www.google.com" icon="close" target="_blank" />
  </div>
);
