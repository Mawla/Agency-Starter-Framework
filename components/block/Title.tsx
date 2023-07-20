import { fontClasses, textClasses, weightClasses } from "../../theme";
import { HeadingLevelType } from "../../types";
import {
  TitleColorType,
  TitleEyebrowColorType,
  TitleFontType,
  titleSizeClasses,
  TitleSizeType,
  TitleWeightType,
} from "./title.options";
import cx from "classnames";
import React from "react";

export type TitleProps = {
  children: React.ReactElement | React.ReactNode;
  as?: HeadingLevelType;
  size?: TitleSizeType;
  weight?: TitleWeightType;
  className?: string;
  color?: TitleColorType;
  eyebrow?: string;
  eyebrowColor?: TitleEyebrowColorType;
  font?: TitleFontType;
};

export const Title = ({
  children,
  as = "h2",
  size = "sm",
  weight = "bold",
  className,
  color = "black",
  eyebrow,
  eyebrowColor = "black",
  font = "sans",
}: TitleProps) => {
  if (!as) as = "h2";
  const Element = as;
  const titleWords = children?.toString()?.trim().split(" ");

  return (
    <Element
      className={cx(
        "hyphens-auto",
        "break-words inline-block",
        "flex flex-col whitespace-pre-line",
        textClasses[color],
        titleSizeClasses[size],
        weightClasses[weight],
        fontClasses[font],
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cx(
            "block mb-[.5em]",
            titleSizeClasses.md,
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
