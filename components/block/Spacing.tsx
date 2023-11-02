import {
  SpaceType,
  paddingTopClasses,
  paddingBottomClasses,
  marginTopClasses,
  marginBottomClasses,
} from "./spacing.options";
import cx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export type SpacingProps = {
  padding?: SpaceType;
  margin?: SpaceType;
  children?: React.ReactElement | React.ReactNode;
  className?: string;
};

export const Spacing = ({
  padding,
  margin,
  children,
  className,
}: SpacingProps) => {
  return (
    <div
      className={twMerge(
        paddingTopClasses[padding?.top || "none"],
        paddingBottomClasses[padding?.bottom || "none"],
        marginTopClasses[margin?.top || "none"],
        marginBottomClasses[margin?.bottom || "none"],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default React.memo(Spacing);
