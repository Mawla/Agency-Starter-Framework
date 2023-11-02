import { GradientOpacityType } from "./GradientOptions";
import cx from "clsx";

export type GradientProps = {
  className?: string;
  from?: GradientOpacityType;
  to?: GradientOpacityType;
};

export const Gradient = ({
  className,
  from = 0.6,
  to = 0.2,
}: GradientProps) => (
  <div
    className={cx(
      "absolute inset-0 z-1",
      "mix-blend-multiply bg-gradient-to-b",
      { ["from-[rgba(33,40,59,0)]"]: from === 0.0 },
      { ["from-[rgba(33,40,59,0.1)]"]: from === 0.1 },
      { ["from-[rgba(33,40,59,0.2)]"]: from === 0.2 },
      { ["from-[rgba(33,40,59,0.3)]"]: from === 0.3 },
      { ["from-[rgba(33,40,59,0.4)]"]: from === 0.4 },
      { ["from-[rgba(33,40,59,0.5)]"]: from === 0.5 },
      { ["from-[rgba(33,40,59,0.6)]"]: from === 0.6 },
      { ["from-[rgba(33,40,59,0.7)]"]: from === 0.7 },
      { ["from-[rgba(33,40,59,0.8)]"]: from === 0.8 },
      { ["from-[rgba(33,40,59,0.9)]"]: from === 0.9 },
      { ["from-[rgba(33,40,59,1)]"]: from === 1 },
      { ["to-[rgba(33,40,59,0)]"]: to === 0.0 },
      { ["to-[rgba(33,40,59,0.1)]"]: to === 0.1 },
      { ["to-[rgba(33,40,59,0.2)]"]: to === 0.2 },
      { ["to-[rgba(33,40,59,0.3)]"]: to === 0.3 },
      { ["to-[rgba(33,40,59,0.4)]"]: to === 0.4 },
      { ["to-[rgba(33,40,59,0.5)]"]: to === 0.5 },
      { ["to-[rgba(33,40,59,0.6)]"]: to === 0.6 },
      { ["to-[rgba(33,40,59,0.7)]"]: to === 0.7 },
      { ["to-[rgba(33,40,59,0.8)]"]: to === 0.8 },
      { ["to-[rgba(33,40,59,0.9)]"]: to === 0.9 },
      { ["to-[rgba(33,40,59,1)]"]: to === 1 },
      className,
    )}
  />
);

export default Gradient;
