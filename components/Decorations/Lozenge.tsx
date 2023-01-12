import cx from "classnames";
import { CSSProperties } from "react";

import { backgroundClasses } from "../../colors";
import { ColorType } from "../../types";
import { RotationType, SizeType } from "./LozengeOptions";

export type LozengeProps = {
  color?: ColorType;
  size?: SizeType;
  rotation?: RotationType;
  className?: string;
  style?: CSSProperties;
};

export const rotationClasses: Record<RotationType, string> = {
  1: "rotate-[30deg]",
  2: "rotate-[60deg]",
  3: "rotate-[90deg]",
  4: "rotate-[120deg]",
  5: "rotate-[150deg]",
  6: "rotate-[180deg]",
  7: "rotate-[210deg]",
  8: "rotate-[240deg]",
  9: "rotate-[270deg]",
  10: "rotate-[300deg]",
  11: "rotate-[330deg]",
  12: "rotate-[360deg]",
};

export const sizeClasses: Record<SizeType, string> = {
  sm: "w-[52px] h-[92px]",
  md: "w-[82px] h-[147px]",
  lg: "w-[117px] h-[209px]",
  xl: "w-[141px] h-[252px]",
};

export const Lozenge = ({ color, size, rotation, className }: LozengeProps) => {
  return (
    <span
      className={cx(
        color && backgroundClasses[color],
        size && sizeClasses[size],
        rotation && rotationClasses[rotation],
        "scale-[40%] tablet:scale-[60%] lg:scale-75 xl:scale-90 2xl:scale-100",
        "origin-center block rounded-full",
        className
      )}
    />
  );
};
