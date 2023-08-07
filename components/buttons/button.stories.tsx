import { Button } from "./Button";
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
        mobile: {
          background: {
            color: "gray-900",
            paddingX: "8",
            paddingY: "4",
          },
          border: {
            radius: "xl",
            width: 4,
            color: "black",
          },
          label: {
            color: "gray-200",
            font: "serif",
            size: "lg",
            uppercase: true,
            weight: "bold",
          },
        },
        tablet: {
          background: {
            color: "gray-100",
            paddingX: "12",
            paddingY: "14",
          },
          border: {
            radius: "lg",
            width: 2,
            color: "black",
          },
          label: {
            color: "gray-600",
            font: "mono",
            size: "4xl",
            uppercase: true,
            weight: "bold",
          },
        },
        desktop: {
          background: {
            color: "gray-300",
            paddingX: "0",
            paddingY: "0",
          },
          border: {
            radius: "none",
            width: 4,
            color: "black",
          },
          label: {
            color: "gray-900",
            font: "sans",
            size: "xl",
            uppercase: false,
            weight: "thin",
          },
        },
      }}
    />
  </>
);

export const CssClass = () => (
  <>
    <style
      dangerouslySetInnerHTML={{
        __html: `
        .btn-primary {
          border: 10px solid red;
        }`,
      }}
    ></style>

    <Button
      label="This is a button"
      theme={{
        name: "primary",
      }}
    />
  </>
);
