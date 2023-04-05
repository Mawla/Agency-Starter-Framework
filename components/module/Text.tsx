import { proseClasses, textClasses } from "../../colors";
import { pick } from "../../helpers/utils/object";
import { ALIGNMENTS, FONTS, SIZES, TextElement } from "../../types";
import { ColorType } from "../../types";
import cx from "classnames";
import React from "react";

export const ALIGN_OPTIONS = pick(
  ALIGNMENTS,
  "left",
  "center",
  "right",
  "auto",
);
export type AlignType = keyof typeof ALIGN_OPTIONS;

export const SIZE_OPTIONS = pick(SIZES, "sm", "md", "lg", "xl", "2xl");
export type SizeType = keyof typeof SIZE_OPTIONS;

export const FONT_OPTIONS = pick(FONTS, "heading", "sans", "mono");
export type FontType = keyof typeof FONT_OPTIONS;

export type TextProps = {
  children: React.ReactElement | React.ReactNode;
  as?: TextElement;
  align?: AlignType | null;
  size?: SizeType | null;
  color?: ColorType;
  background?: ColorType;
  className?: string;
  font?: FontType | null;
};

const alignClasses: Record<AlignType, string> = {
  auto: "",
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

const sizeClasses: Record<SizeType, string> = {
  sm: "prose-sm md:prose-md",
  md: "prose-md md:prose-base",
  lg: "prose-lg md:prose-xl",
  xl: "prose-xl md:prose-2xl",
  "2xl": "prose-2xl xl:prose-3xl",
};

const fontClasses: Record<FontType, string> = {
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
          "prose-strong:font-bold prose-strong:text-current",
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
