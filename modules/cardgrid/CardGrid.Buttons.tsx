import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/buttongroup2";
import { BREAKPOINTS, useBreakpoint } from "../../hooks/useBreakpoint";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/buttongroup2"
    ),
);

type CardGridButtonsProps = {
  buttons?: ButtonProps[];
  theme?: any;
};

export const CardGridButtons = ({ buttons, theme }: CardGridButtonsProps) => {
  const { screenWidth } = useBreakpoint();
  if (!buttons) return null;

  return (
    <div
      className={cx("flex", {
        ["md:justify-start"]: theme?.module?.align === "left",
        ["md:justify-center"]: theme?.module?.align === "center",
        ["md:justify-end"]: theme?.module?.align === "right",
      })}
    >
      <ButtonGroup
        items={buttons}
        stretch={false}
        direction="horizontal"
        align={
          // this is needed to control the wrapping of multiple buttons
          screenWidth < BREAKPOINTS.md
            ? "left"
            : theme?.module?.align === "center"
            ? "center"
            : theme?.module?.align === "right"
            ? "right"
            : "left"
        }
      />
    </div>
  );
};
