import { textClasses } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { SIZES, TextElement, FONT_WEIGHTS } from "../../types";
import { ColorType } from "../../types";
import cx from "classnames";
import React from "react";

export const SIZE_OPTIONS = pick(
  SIZES,
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl"
);
export type SizeType = keyof typeof SIZE_OPTIONS;

export const WEIGHT_OPTIONS = pick(FONT_WEIGHTS, "book", "bold");
export type WeightType = keyof typeof WEIGHT_OPTIONS;

export type TitleProps = {
  children: React.ReactElement | React.ReactNode;
  as?: TextElement;
  size?: SizeType;
  weight?: WeightType;
  className?: string;
  color?: ColorType;
  eyebrow?: string;
  eyebrowColor?: ColorType;
};

const sizeClasses: Record<SizeType, string> = {
  sm: "text-title-sm-sm md:text-title-sm-md lg:text-title-sm-lg",
  md: "text-title-md-sm md:text-title-md-md lg:text-title-md-lg",
  lg: "text-title-lg-sm md:text-title-lg-md lg:text-title-lg-lg",
  xl: "text-title-xl-sm md:text-title-xl-md lg:text-title-xl-lg",
  "2xl": "text-title-2xl-sm md:text-title-2xl-md lg:text-title-2xl-lg",
  "3xl": "text-title-3xl-sm md:text-title-3xl-md lg:text-title-3xl-lg",
  "4xl": "text-title-4xl-sm md:text-title-4xl-md lg:text-title-4xl-lg",
};

const weightClasses: Record<WeightType, string> = {
  book: "font-book",
  bold: "font-bold",
};

export const Title = ({
  children,
  as = "h2",
  size = "sm",
  weight = "bold",
  className,
  color = "neutral-base",
  eyebrow,
  eyebrowColor = "brand-base",
}: TitleProps) => {
  const Element = as;
  const titleWords = children?.toString()?.trim().split(" ");

  return (
    <Element
      className={cx(
        "hyphens-auto",
        "break-words inline-block",
        "font-sans",
        "flex flex-col whitespace-pre-line",
        textClasses[color],
        sizeClasses[size],
        weightClasses[weight],
        className
      )}
    >
      {eyebrow && (
        <span
          className={cx(
            "block mb-[.5em]",
            sizeClasses.md,
            textClasses[eyebrowColor],
            {
              ["opacity-75"]: eyebrowColor === "white",
            }
          )}
        >
          {eyebrow}&nbsp;
        </span>
      )}
      {typeof children === "string" ? titleWords?.join(" ") : children}
    </Element>
  );
};

export const TitleMemo = React.memo(Title);
