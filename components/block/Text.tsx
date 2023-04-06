import { proseClasses, textClasses } from "../../colors";
import { TextElement } from "../../types";
import { ColorType } from "../../types";
import { TextAlignType, TextFontType, TextSizeType } from "./text.options";
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

const alignClasses: Record<TextAlignType, string> = {
  auto: "",
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

const sizeClasses: Record<TextSizeType, string> = {
  sm: "prose-sm md:prose-md",
  md: "prose-md md:prose-base",
  lg: "prose-lg md:prose-xl",
  xl: "prose-xl md:prose-2xl",
  "2xl": "prose-2xl xl:prose-3xl",
};

const fontClasses: Record<TextFontType, string> = {
  sans: "font-sans",
  mono: "font-mono",
  heading: "font-sans",
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
          align && alignClasses[align],
          size && sizeClasses[size],
          font && fontClasses[font],
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
