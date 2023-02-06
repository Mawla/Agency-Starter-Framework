import { BleedSpaceType } from "./BleedOptions";
import cx from "classnames";
import React from "react";

export type BleedProps = {
  bleed?: BleedSpaceType;
  children: React.ReactElement | React.ReactNode;
  className?: string;
  id?: string;
};

export const bleedClasses: Record<BleedSpaceType, string> = {
  none: "px-0",
  sm: "px-3 sm:px-4 lg:px-12 xl:px-20",
  md: "px-5 sm:px-8 lg:px-14 xl:px-20",
  lg: "px-8 sm:px-10 lg:px-16 xl:px-20",
};

export const Bleed = ({ children, bleed, className, id }: BleedProps) => {
  return (
    <div
      className={cx("w-full bleed", bleed && bleedClasses[bleed], className)}
      id={id}
    >
      {children}
    </div>
  );
};

export default React.memo(Bleed);
