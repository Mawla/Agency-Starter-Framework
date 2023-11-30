import { fontClasses, textClasses, weightClasses } from "../../theme";
import { HtmlTextNodeType } from "../../types";
import {
  TitleColorType,
  TitleFontType,
  titleSizeClasses,
  TitleSizeType,
  TitleWeightType,
} from "./title.options";
import cx from "clsx";
import React from "react";

export type TitleProps = {
  children: React.ReactElement | React.ReactNode;
  as?: HtmlTextNodeType;
  size?: TitleSizeType;
  weight?: TitleWeightType;
  className?: string;
  color?: TitleColorType;
  font?: TitleFontType;
};

export const Title = ({
  children,
  as = "h2",
  size = "4xl",
  weight = "bold",
  className,
  color,
  font = "heading",
}: TitleProps) => {
  if (!as) as = "h2";
  const Element = as;
  const titleWords = children?.toString()?.trim().split(" ");

  return (
    <Element
      className={cx(
        "title",
        "w-full",
        "text-balance",
        "break-words inline-block",
        "flex flex-col whitespace-pre-line",
        color ? textClasses[color] : "text-current",
        titleSizeClasses[size || "4xl"],
        weightClasses[weight || "bold"],
        fontClasses[font || "heading"],
        className,
      )}
      data-animate="fade-up"
    >
      {typeof children === "string" ? titleWords?.join(" ") : children}
    </Element>
  );
};

export default React.memo(Title);
