import { proseClasses, textClasses } from "../../colors";
import { TextElement } from "../../types";
import { ColorType } from "../../types";
import {
  textAlignClasses,
  TextAlignType,
  textFontClasses,
  TextFontType,
  textSizeClasses,
  TextSizeType,
} from "./text.options";
import cx from "classnames";
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
};

export const Text = ({
  children,
  as = "div",
  background,
  color,
  align = "left",
  size = "lg",
  className,
  font = "sans",
}: TextProps) => {
  const Element = as;

  return (
    <div className={className}>
      <Element
        className={cx(
          "break-words prose font-regular leading-relaxed",
          "prose-strong:font-bold prose-strong:text-current prose-headings:text-current",
          "prose-a:text-current prose-a:underline prose-a:underline-offset-4",
          align && textAlignClasses[align],
          size && textSizeClasses[size],
          font && textFontClasses[font],
          color
            ? textClasses[color]
            : background
            ? proseClasses[background]
            : "text-current",
        )}
      >
        {children}
      </Element>
    </div>
  );
};

export default React.memo(Text);
