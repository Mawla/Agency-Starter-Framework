import { bleedClasses, BleedSpaceType } from "./bleed.options";
import cx from "clsx";
import React from "react";

export type BleedProps = {
  bleed?: BleedSpaceType;
  children: React.ReactElement | React.ReactNode;
  className?: string;
  id?: string;
};

export const Bleed = React.forwardRef<HTMLDivElement, BleedProps>(
  ({ children, bleed, className, id }, ref) => {
    return (
      <div
        ref={ref}
        className={cx("w-full bleed", bleed && bleedClasses[bleed], className)}
        id={id}
      >
        {children}
      </div>
    );
  },
);

Bleed.displayName = "Bleed";

export default React.memo(Bleed);
