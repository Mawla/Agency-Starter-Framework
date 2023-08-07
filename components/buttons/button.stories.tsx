import { Button } from "./Button";
import {
  BackgroundColorType,
  ButtonBorderColorType,
  ButtonTextColorType,
  BUTTON_BACKGROUND_COLOR_OPTIONS,
  BUTTON_BORDER_COLOR_OPTIONS,
  BUTTON_TEXT_COLOR_OPTIONS,
} from "./button.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Button,
  title: "Components/Button",
} as Meta;

export const AsButton = () => <Button label="Button text" as="button" />;

export const AsLink = () => (
  <Button label="Button text" as="a" href="https://www.google.com" />
);

export const AsDiv = () => <Button label="Button text" as="div" icon="arrow" />;

export const IconAfter = () => (
  <Button label="Read more" icon="arrow" iconPosition="after" />
);

export const IconBefore = () => (
  <Button label="Button text" icon="arrow" iconPosition="before" />
);

export const IconOnly = () => (
  <>
    <Button ariaLabel="Button text" icon="arrow" iconPosition="before" />
    <Button ariaLabel="Button text" icon="arrow" iconPosition="before" />
  </>
);

export const OrphanIcons = () => (
  <div style={{ maxWidth: 200 }} className="grid gap-4 border p-0.5">
    <Button label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " />

    <Button
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
      icon="arrow"
      iconPosition="before"
    />
    <Button
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
      icon="arrow"
      iconPosition="after"
    />
    <Button
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "
      icon="arrow"
      iconPosition="after"
    />
  </div>
);

export const Target = () => (
  <div style={{ maxWidth: 200 }} className="grid gap-4 border p-0.5">
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

export const Theme = () => (
  <>
    <Button
      label="This is a button"
      theme={{
        background: {
          color: "gray-900",
          paddingX: 8,
          paddingY: 4,
        },
        border: {
          radius: "xl",
          width: 4,
        },
        label: {
          color: "gray-200",
          font: "serif",
          size: "lg",
          uppercase: true,
          weight: "bold",
        },
      }}
    />
  </>
);
