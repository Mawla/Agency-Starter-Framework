import { backgroundClasses, textClasses } from "../../colors";
import { ColorType } from "../../types";
import { BackgroundColorType, ModuleRoundedType } from "./BackgroundOptions";
import cx from "classnames";
import React from "react";

export type BackgroundProps = {
  children: React.ReactElement | React.ReactNode;
  className?: string;
  theme?: {
    text?: ColorType;
    background?: BackgroundColorType;
    rounded?: ModuleRoundedType;
  };
};

export const roundedOuterModuleClasses: Record<"top" | "bottom", string> = {
  top: "rounded-t-3xl sm:rounded-t-4xl md:rounded-t-5xl xl:rounded-t-6xl",
  bottom: "rounded-b-3xl sm:rounded-b-4xl md:rounded-b-5xl xl:rounded-b-6xl",
};

export const roundedInnerModuleClasses: Record<"top" | "bottom", string> = {
  top: "rounded-t-3xl sm:rounded-t-4xl md:rounded-t-5xl",
  bottom: "rounded-b-3xl sm:rounded-b-4xl md:rounded-b-5xl",
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
          [roundedOuterModuleClasses.top]: theme.rounded?.top === "lg",
          [roundedOuterModuleClasses.bottom]: theme.rounded?.bottom === "lg",
          [roundedInnerModuleClasses.top]: theme.rounded?.top === "md",
          [roundedInnerModuleClasses.bottom]: theme.rounded?.bottom === "md",
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
