import { backgroundClasses, textClasses } from "../../theme";
import { ColorType } from "../../types";
import {
  BlockRoundedType,
  backgroundRoundedBottomClasses,
  backgroundRoundedTopClasses,
} from "./background.options";
import cx from "clsx";
import React from "react";

export type BackgroundProps = {
  children: React.ReactElement | React.ReactNode;
  className?: string;
  theme?: {
    text?: ColorType;
    background?: ColorType;
    rounded?: BlockRoundedType;
  };
};

export const Background = ({ children, theme, className }: BackgroundProps) => {
  return (
    <div
      className={cx(
        "relative",
        {
          [backgroundRoundedTopClasses.md]: theme?.rounded?.top === "md",
          [backgroundRoundedBottomClasses.md]: theme?.rounded?.bottom === "md",
          [backgroundRoundedTopClasses.lg]: theme?.rounded?.top === "lg",
          [backgroundRoundedBottomClasses.lg]: theme?.rounded?.bottom === "lg",
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
