import { slugify } from "../../helpers/utils/string";
import { backgroundClasses } from "../../theme";
import { ColorType } from "../../types";
import { Background } from "./Background";
import { Bleed } from "./Bleed";
import { Spacing, SpacingProps } from "./Spacing";
import { Width } from "./Width";
import { BlockRoundedType } from "./background.options";
import { SpaceType } from "./spacing.options";
import { WidthType } from "./width.options";
import cx from "classnames";
import React from "react";

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
} & Partial<SpacingProps>;

export const Wrapper = ({
  children,
  theme,
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

  return (
    <Bleed
      bleed={theme?.width === "full" ? "none" : "sm"}
      id={id ? slugify(id) : ""}
      className={cx(
        className,
        theme?.outerBackground && backgroundClasses[theme?.outerBackground],
      )}
    >
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
            <Spacing
              padding={{
                top: theme?.padding?.top || "md",
                bottom: theme?.padding?.bottom || "md",
              }}
            >
              <Bleed bleed="lg">
                <Width width="inner">{children}</Width>
              </Bleed>
            </Spacing>
          </Background>
        </Width>
      </Spacing>
    </Bleed>
  );
};

export default React.memo(Wrapper);
