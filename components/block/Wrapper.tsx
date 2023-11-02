import { backgroundClasses } from "../../theme";
import { DecorationProps } from "../decorations/Decoration";
import { DecorationsProps } from "../decorations/Decorations";
import { Background } from "./Background";
import { Bleed, BleedProps } from "./Bleed";
import { Spacing } from "./Spacing";
import { Width, WidthProps } from "./Width";
import { BlockThemeType } from "./block.options";
import cx from "clsx";
import React, { ComponentType, lazy } from "react";

const Decoration = lazy<ComponentType<DecorationProps>>(
  () =>
    import(/* webpackChunkName: "Decoration" */ "../decorations/Decoration"),
);

const Decorations = lazy<ComponentType<DecorationsProps>>(
  () =>
    import(/* webpackChunkName: "Decorations" */ "../decorations/Decorations"),
);

export type WrapperProps = {
  children?: React.ReactElement | React.ReactNode;
  theme?: BlockThemeType;
  className?: string;
  innerClassName?: string;
  decorations?: DecorationProps[];
  slots?: {
    outside?: React.ReactNode;
    outsideSpacing?: React.ReactNode;
    inside?: React.ReactNode;
    insideSpacing?: React.ReactNode;
    insideBleed?: React.ReactNode;
    insideWidth?: React.ReactNode;
  };
};

export const Wrapper = ({
  children,
  theme,
  decorations,
  className,
  innerClassName,
  slots,
}: WrapperProps) => {
  /**
   * [small bleed]
   *   [margin top/bottom]
   *       [width]
   *         [background]
   *            [padding top/bottom]
   *              [bleed]
   *                [inner width]
   *                  [content]
   */

  if (!theme) theme = {};
  if (!theme?.width) theme.width = "full";

  const innerDecorations = decorations
    ?.filter(Boolean)
    .filter(({ location }) => location === "inside" || !location);

  return (
    <Bleed
      bleed={theme?.width === "full" ? "none" : "sm"}
      className={cx(
        "relative",
        className,
        theme?.outerBackground && backgroundClasses[theme?.outerBackground],
      )}
    >
      {slots?.outside}
      <Decorations decorations={decorations} location="outside" />
      <Spacing
        padding={{
          top: theme?.margin?.top || "none",
          bottom: theme?.margin?.bottom || "none",
        }}
      >
        {slots?.outsideSpacing}
        <Width width={theme?.width || "full"}>
          <Background
            theme={{
              ...theme,
              rounded: {
                top: theme?.rounded?.top,
                bottom: theme?.rounded?.bottom,
              },
            }}
            className={innerClassName}
          >
            {innerDecorations?.map((decoration) => (
              <Decoration
                {...decoration}
                key={decoration._key}
                _key={decoration._key}
                theme={{
                  rounded: {
                    top: theme?.rounded?.top,
                    bottom: theme?.rounded?.bottom,
                  },
                }}
              />
            ))}
            {slots?.inside}
            <Spacing
              padding={{
                top: theme?.padding?.top || "md",
                bottom: theme?.padding?.bottom || "md",
              }}
            >
              {slots?.insideSpacing}
              <Bleed bleed="lg">
                {slots?.insideBleed}
                <Width width="inner" className="relative z-10">
                  {slots?.insideWidth}
                  {children}
                </Width>
              </Bleed>
            </Spacing>
          </Background>
        </Width>
      </Spacing>
    </Bleed>
  );
};

export default React.memo(Wrapper);
