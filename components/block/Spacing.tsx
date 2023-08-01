import {
  SpaceType,
  paddingTopClasses,
  paddingBottomClasses,
  marginTopClasses,
  marginBottomClasses,
} from "./spacing.options";
import cx from "classnames";
import React from "react";

export type SpacingProps = {
  padding?: SpaceType;
  margin?: SpaceType;
  children?: React.ReactElement | React.ReactNode;
};

export const Spacing = ({ padding, margin, children }: SpacingProps) => {
  return (
    <div
      className={cx(
        paddingTopClasses[padding?.top || "none"],
        paddingBottomClasses[padding?.bottom || "none"],
        marginTopClasses[margin?.top || "none"],
        marginBottomClasses[margin?.bottom || "none"],
      )}
    >
      {children}
    </div>
  );
};

export default React.memo(Spacing);
