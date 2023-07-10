import { bleedClasses, BleedSpaceType } from "./bleed.options";
import cx from "classnames";
import React from "react";

export type BleedProps = {
  bleed?: BleedSpaceType;
  children: React.ReactElement | React.ReactNode;
  className?: string;
  id?: string;
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
