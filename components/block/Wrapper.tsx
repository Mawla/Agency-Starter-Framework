import { slugify } from "../../helpers/utils/string";
import { backgroundClasses } from "../../theme";
import { ColorType } from "../../types";
import { Background } from "./Background";
import { Bleed } from "./Bleed";
import { DecorationProps } from "./Decoration";
import { Spacing, SpacingProps } from "./Spacing";
import { Width } from "./Width";
import { BlockRoundedType } from "./background.options";
import { SpaceType } from "./spacing.options";
import { WidthType } from "./width.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Decoration = lazy<ComponentType<DecorationProps>>(
  () => import(/* webpackChunkName: "Decoration" */ "./Decoration"),
);

export type WrapperProps = {
  id?: string;
  children?: React.ReactElement | React.ReactNode;
  className?: string;
  innerClassName?: string;
  theme?: {
    padding?: SpaceType;
    margin?: SpaceType;
    background?: ColorType;
    outerBackground?: ColorType;
    text?: ColorType;
    rounded?: BlockRoundedType;
    width?: WidthType;
  };
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

  const innerDecorations = decorations?.filter(
    ({ position }) => position === "inside",
  );

  const outerDecorations = decorations?.filter(
    ({ position }) => position === "outside" || !position,
  );

  return (
    <Bleed
      bleed={theme?.width === "full" ? "none" : "sm"}
      id={id ? slugify(id) : ""}
      className={cx(
        "relative",
        className,
        theme?.outerBackground && backgroundClasses[theme?.outerBackground],
      )}
    >
      {outerDecorations?.map((decoration) => (
        <Decoration
          {...decoration}
          key={decoration._key}
          _key={decoration._key}
        />
      ))}
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
