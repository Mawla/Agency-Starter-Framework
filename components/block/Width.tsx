import { widthClasses, WidthType } from "./width.options";
import cx from "clsx";
import React from "react";

export type WidthProps = {
  width?: WidthType;
  children: React.ReactElement | React.ReactNode;
  className?: string;
};

export const Width = ({ children, width, className }: WidthProps) => {
  return (
    <div
      className={cx("mx-auto", className, {
        [widthClasses.full]: !width || width === "full",
        [widthClasses.inner]: width === "inner",
        [widthClasses.outer]: width === "outer",
      })}
    >
      {children}
    </div>
  );
};

export default React.memo(Width);
