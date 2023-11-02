import { ButtonProps } from "./Button";
import { ButtonGroup } from "./ButtonGroup";
import { ALIGN_OPTIONS, DIRECTION_OPTIONS } from "./buttongroup.options";
import { Meta } from "@storybook/react";
import cx from "clsx";
import React from "react";

export default {
  component: ButtonGroup,
  title: "Components/ButtonGroup",
} as Meta;

const buttons: ButtonProps[] = [
  { label: "Button text", theme: { icon: { name: "arrow" } } },
  { label: "Button text" },
];

export const Directions = () => (
  <div className="divide-y">
    {(
      Object.entries(DIRECTION_OPTIONS) as [
        key: keyof typeof DIRECTION_OPTIONS,
        label: string,
      ][]
    ).map(([direction, label]) => (
      <div key={label} className="py-10">
        <ButtonGroup items={buttons} direction={direction} />
      </div>
    ))}
  </div>
);

export const Stretch = () => (
  <div style={{ width: 300 }} className="border">
    {(
      Object.entries(DIRECTION_OPTIONS) as [
        key: keyof typeof DIRECTION_OPTIONS,
        label: string,
      ][]
    ).map(([direction, label]) => (
      <div key={label} className="py-10">
        <ButtonGroup
          direction={direction}
          items={buttons.map((button) => ({
            ...button,
            stretch: direction === "vertical",
          }))}
          stretch
        />
      </div>
    ))}
  </div>
);

export const Alignments = () => (
  <div>
    <div className="divide-y border">
      {(
        Object.entries(ALIGN_OPTIONS) as [
          key: keyof typeof ALIGN_OPTIONS,
          label: string,
        ][]
      ).map(([align, label]) => (
        <div
          key={label}
          className={cx("py-10 h-48 w-full", {
            ["text-left items-start"]: align === "left",
            ["text-center items-center"]: align === "center",
            ["text-right items-end"]: align === "right",
          })}
        >
          <span className="inline-block mr-4">horizontal / {align}</span>
          <ButtonGroup
            items={buttons}
            align={align}
            direction="horizontal"
            stretch={false}
          />
        </div>
      ))}
    </div>

    <div className="divide-y border">
      {(
        Object.entries(ALIGN_OPTIONS) as [
          key: keyof typeof ALIGN_OPTIONS,
          label: string,
        ][]
      ).map(([align, label]) => (
        <div
          key={label}
          className={cx("py-10 h-48 w-full", {
            ["text-left items-start"]: align === "left",
            ["text-center items-center"]: align === "center",
            ["text-right items-end"]: align === "right",
          })}
        >
          <span className="inline-block mr-4">vertical / {align}</span>
          <ButtonGroup
            items={buttons}
            align={align}
            direction="vertical"
            stretch={false}
          />
        </div>
      ))}
    </div>
  </div>
);
