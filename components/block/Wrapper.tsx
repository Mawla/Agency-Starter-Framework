import { backgroundClasses } from "../../theme";
import { DecorationProps } from "../decorations/Decoration";
import { DecorationsProps } from "../decorations/Decorations";
import { Background } from "./Background";
import { Bleed } from "./Bleed";
import { Spacing, SpacingProps } from "./Spacing";
import { Width } from "./Width";
import { BlockThemeType } from "./block.options";
import cx from "classnames";
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
  id?: string;
  children?: React.ReactElement | React.ReactNode;
  className?: string;
  innerClassName?: string;
  theme?: BlockThemeType;
  decorations?: DecorationProps[];
} & Partial<SpacingProps>;

export const Wrapper = ({
  children,
  theme,
  decorations,
  id,
  className,
  innerClassName,
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
      <Decorations decorations={decorations} location="outside" />
      <Spacing
        padding={{
          top: theme?.margin?.top || "none",
          bottom: theme?.margin?.bottom || "none",
        }}
      >
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
            <Spacing
              padding={{
                top: theme?.padding?.top || "md",
                bottom: theme?.padding?.bottom || "md",
              }}
            >
              <Bleed bleed="lg">
                <Width width="inner" className="relative z-10">
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
