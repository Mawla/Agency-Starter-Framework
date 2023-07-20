import { Button } from "./Button";
import {
  BackgroundColorType,
  ButtonBorderColorType,
  ButtonTextColorType,
  BUTTON_BACKGROUND_COLOR_OPTIONS,
  BUTTON_BORDER_COLOR_OPTIONS,
  BUTTON_SIZE_OPTIONS,
  BUTTON_TEXT_COLOR_OPTIONS,
} from "./button.options";
import { Meta } from "@storybook/react";
import React from "react";

export default {
  component: Button,
  title: "Components/Button",
} as Meta;

export const Sizes = () => (
  <div className="flex flex-col gap-2 flex-wrap">
    {(
      Object.entries(BUTTON_SIZE_OPTIONS) as [
        key: keyof typeof BUTTON_SIZE_OPTIONS,
        label: string,
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
  <Button label="Button text" icon="arrow" iconPosition="before" />
);

export const IconOnly = () => (
  <>
    {(
      Object.entries(BUTTON_SIZE_OPTIONS) as [
        key: keyof typeof BUTTON_SIZE_OPTIONS,
        label: string,
      ][]
    ).map(([size, label]) => (
      <div key={label} className="flex gap-2 mr-2 mb-2">
        <Button
          size={size}
          ariaLabel="Button text"
          icon="arrow"
          iconPosition="before"
        />
        <Button
          size={size}
          ariaLabel="Button text"
          icon="arrow"
          iconPosition="before"
          compact
        />
      </div>
    ))}
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
    {(Object.keys(BUTTON_BORDER_COLOR_OPTIONS) as ButtonBorderColorType[]).map(
      (border: ButtonBorderColorType) => (
        <div className="mb-10 flex gap-4 flex-wrap" key={border}>
          {(
            Object.keys(
              BUTTON_BACKGROUND_COLOR_OPTIONS,
            ) as BackgroundColorType[]
          ).map((background: BackgroundColorType) =>
            (
              Object.keys(BUTTON_TEXT_COLOR_OPTIONS) as ButtonTextColorType[]
            ).map((text: ButtonTextColorType) => (
              <Button
                key={border + background + text}
                theme={{
                  background: {
                    color: background,
                  },
                  text: {
                    color: text,
                  },
                  border: {
                    color: border,
                  },
                }}
                label={`bg ${background}, text ${text}, border ${border}`}
                size="sm"
              />
            )),
          )}
        </div>
      ),
    )}
  </>
);
