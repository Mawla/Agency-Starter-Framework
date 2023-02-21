import { textClasses } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { SIZES, FONT_WEIGHTS, HeadingLevelType } from "../../types";
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
  "4xl",
  "5xl",
  "6xl",
);
export type SizeType = keyof typeof SIZE_OPTIONS;

export const WEIGHT_OPTIONS = pick(FONT_WEIGHTS, "regular", "bold");
export type WeightType = keyof typeof WEIGHT_OPTIONS;

export type TitleProps = {
  children: React.ReactElement | React.ReactNode;
  as?: HeadingLevelType;
  size?: SizeType;
  weight?: WeightType;
  className?: string;
  color?: ColorType;
  eyebrow?: string;
  eyebrowColor?: ColorType;
};

const sizeClasses: Record<SizeType, string> = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-lg lg:text-xl",
  "2xl": "text-lg md:text-xl text-2xl",
  "3xl": "text-xl md:text-2xl lg:text-3xl",
  "4xl": "text-2xl md:text-3xl lg:text-4xl",
  "5xl": "text-3xl md:text-4xl lg:text-5xl",
  "6xl": "text-4xl md:text-5xl lg:text-6xl",
};

const weightClasses: Record<WeightType, string> = {
  regular: "font-regular",
  bold: "font-bold",
};

export const Title = ({
  children,
  as = "h2",
  size = "sm",
  weight = "bold",
  className,
  color = "neutral-600",
  eyebrow,
  eyebrowColor = "brand-600",
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
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cx(
            "block mb-[.5em]",
            sizeClasses.md,
            textClasses[eyebrowColor],
          )}
        >
          {eyebrow}&nbsp;
        </span>
      )}
      {typeof children === "string" ? titleWords?.join(" ") : children}
    </Element>
  );
};

export default React.memo(Title);
