import {
  fontClasses,
  proseClasses,
  textClasses,
  weightClasses,
} from "../../theme";
import { TextElement } from "../../types";
import { ColorType } from "../../types";
import {
  textAlignClasses,
  TextAlignType,
  TextFontType,
  textSizeClasses,
  TextSizeType,
  TextWeightType,
} from "./text.options";
import cx from "clsx";
import React from "react";

export type TextProps = {
  children: React.ReactElement | React.ReactNode;
  as?: TextElement;
  align?: TextAlignType | null;
  size?: TextSizeType | null;
  color?: ColorType;
  background?: ColorType;
  className?: string;
  font?: TextFontType | null;
  weight?: TextWeightType | null;
};

export const Text = ({
  children,
  as = "div",
  background,
  color,
  align = "left",
  size = "lg",
  className,
  font = "text",
  weight,
}: TextProps) => {
  const Element = as;

  return (
    <div className={cx("text", className)}>
      <Element
        className={cx(
          "text w-full",
          "break-words prose font-regular leading-relaxed",
          "prose-strong:font-bold prose-strong:text-current prose-headings:text-current",
          "prose-a:text-current prose-a:underline prose-a:underline-offset-4",
          "[&>*:first-child_img]:mt-0",
          align && textAlignClasses[align],
          size && textSizeClasses[size],
          font && fontClasses[font],
          weight && weightClasses[weight],
          color
            ? textClasses[color]
            : background
            ? proseClasses[background]
            : "text-current",
        )}
        data-animate="fade-up"
      >
        {children}
      </Element>
    </div>
  );
};

export default React.memo(Text);
