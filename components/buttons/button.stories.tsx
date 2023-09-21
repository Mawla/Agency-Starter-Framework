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

export const AsDiv = () => (
  <Button
    label="Button text"
    as="div"
    presetTheme={{ icon: { name: "arrow" } }}
  />
);

export const IconPosition = () => (
  <div style={{ maxWidth: 200 }} className="grid gap-4 border p-0.5">
    <Button label="Default" presetTheme={{ icon: { name: "arrow" } }} />
    <Button
      label="After"
      presetTheme={{ icon: { name: "arrow", position: "after" } }}
    />
    <Button
      label="Before"
      presetTheme={{ icon: { name: "arrow", position: "before" } }}
    />
    <Button
      label="Before Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
      presetTheme={{ icon: { name: "arrow", position: "before" } }}
    />
    <Button
      label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt after"
      presetTheme={{ icon: { name: "arrow", position: "after" } }}
    />
    <Button
      label="Lorem"
      presetTheme={{
        icon: { name: "arrow", position: "after" },
        mobile: { label: { size: "3xl" } },
      }}
    />
  </div>
);

export const IconOnly = () => (
  <>
    <Button
      ariaLabel="Button text"
      presetTheme={{ icon: { name: "arrow", position: "after" } }}
    />
    <Button
      ariaLabel="Button text"
      presetTheme={{ icon: { name: "arrow", position: "before" } }}
    />
  </>
);

export const Target = () => (
  <div style={{ maxWidth: 200 }} className="grid gap-4 border p-0.5">
    <Button label="External" target="_blank" href="https://www.google.com" />
    <Button label="Internal" href="https://www.google.com" />
    <Button
      label="External with icon"
      href="https://www.google.com"
      presetTheme={{ icon: { name: "close" } }}
      target="_blank"
    />
    <Button
      label="External with icon"
      href="https://www.google.com"
      presetTheme={{ icon: { name: "close", position: "before" } }}
      target="_blank"
    />
    <Button
      label="External with icon"
      href="https://www.google.com"
      presetTheme={{ icon: { name: "close" } }}
      target="_blank"
    />
    <Button
      href="https://www.google.com"
      presetTheme={{ icon: { name: "close" } }}
      target="_blank"
    />
  </div>
);

export const Theme = () => (
  <>
    <Button
      label="This is a button"
      presetTheme={{
        mobile: {
          border: {
            color: "black",
            width: 2,
          },
        },
        tablet: {
          border: {
            color: "white",
            width: 0,
          },
        },
        desktop: {
          border: {
            color: "black",
            width: 1,
          },
        },
      }}
    />

    <Button
      label="This is a button"
      presetTheme={{
        mobile: {
          background: {
            color: "black",
            paddingX: "8",
            paddingY: "4",
          },
          border: {
            radius: "xl",
            width: 4,
            color: "black",
          },
          label: {
            color: "white",
            font: "serif",
            size: "lg",
            transform: "lowercase",
            weight: "bold",
          },
        },
        tablet: {
          background: {
            color: "white",
            paddingX: "12",
            paddingY: "14",
          },
          border: {
            radius: "lg",
            width: 2,
            color: "black",
          },
          label: {
            color: "black",
            font: "mono",
            size: "4xl",
            transform: "capitalize",
            weight: "bold",
          },
        },
        desktop: {
          background: {
            color: "black",
            paddingX: "0",
            paddingY: "0",
          },
          border: {
            radius: "none",
            width: 4,
            color: "black",
          },
          label: {
            color: "white",
            font: "text",
            size: "xl",
            transform: "uppercase",
            weight: "thin",
          },
        },
      }}
    />
  </>
);

export const CustomTheme = () => (
  <>
    <Button
      label="This is a button"
      theme={{
        mobile: {
          label: {
            color: "white",
          },
          background: {
            color: "black",
            paddingX: "8",
            paddingY: "4",
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
      presetTheme={{
        name: "primary",
      }}
    />
  </>
);
