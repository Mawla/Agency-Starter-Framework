import { backgroundClasses, textClasses } from "../../colors";
import { ColorType } from "../../types";
import {
  BackgroundColorType,
  BlockRoundedType,
  roundedBottomClasses,
  roundedTopClasses,
} from "./background.options";
import cx from "classnames";
import React from "react";

export type BackgroundProps = {
  children: React.ReactElement | React.ReactNode;
  className?: string;
  theme?: {
    text?: ColorType;
    background?: BackgroundColorType;
    rounded?: BlockRoundedType;
  };
};

export const Background = ({
  children,
  theme = {
    text: "black",
    background: "white",
    rounded: { top: "lg", bottom: "lg" },
  },
  className,
}: BackgroundProps) => {
  return (
    <div
      data-background
      className={cx(
        "relative",
        {
          [roundedTopClasses.md]: theme.rounded?.top === "md",
          [roundedBottomClasses.md]: theme.rounded?.bottom === "md",
          [roundedTopClasses.lg]: theme.rounded?.top === "lg",
          [roundedBottomClasses.lg]: theme.rounded?.bottom === "lg",
        },
        theme?.background && backgroundClasses[theme?.background],
        theme?.text && textClasses[theme?.text],
        className,
      )}
    >
      <div className={cx("relative z-1")}>{children}</div>
    </div>
  );
};

export default React.memo(Background);
