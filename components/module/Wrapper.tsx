import { slugify } from "../../helpers/utils/string";
import { ColorType } from "../../types";
import { Background } from "./Background";
import { Bleed } from "./Bleed";
import { Spacing, SpacingProps } from "./Spacing";
import { Width } from "./Width";
import { BackgroundColorType, ModuleRoundedType } from "./background.options";
import { SpaceType } from "./spacing.options";
import { WidthType } from "./width.options";
import React from "react";

export type WrapperProps = {
  id?: string;
  children?: React.ReactElement | React.ReactNode;
  className?: string;
  innerClassName?: string;
  theme?: {
    space?: SpaceType;
    background?: BackgroundColorType;
    text?: ColorType;
    rounded?: ModuleRoundedType;
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
   * with background
   * [spacing top/bottom]
   *   [small bleed]
   *     [full width]
   *       [background]
   *         [medium bleed]
   *           [inner width]
   *             [content]
   */

  if (theme?.background) {
    if (theme?.width === "inner") {
      theme.rounded = {
        top: theme?.rounded?.top || "md",
        bottom: theme?.rounded?.bottom || "md",
      };
    }

    if (!theme?.width || theme?.width === "outer") {
      theme.rounded = {
        top: theme?.rounded?.top || "lg",
        bottom: theme?.rounded?.bottom || "lg",
      };
    }

    if (!theme?.width || theme?.width === "full") {
      theme.rounded = {
        top: theme?.rounded?.top || "none",
        bottom: theme?.rounded?.bottom || "none",
      };
    }

    return (
      <Bleed
        bleed={theme?.width === "full" ? "none" : "sm"}
        id={id ? slugify(id) : ""}
        className={className}
      >
        <Spacing space={theme?.space || { top: "none", bottom: "lg" }}>
          <Width width={theme?.width || "outer"}>
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
              <Bleed bleed="lg">
                <Width width="inner">{children}</Width>
              </Bleed>
            </Background>
          </Width>
        </Spacing>
      </Bleed>
    );
  }

  /**
   * without background
   * [medium bleed]
   *   [spacing top/bottom]
   *     [inner width]
   *       [content]
   */

  if (!theme?.background) {
    return (
      <Bleed bleed="md" id={id ? slugify(id) : ""} className={className}>
        <Spacing space={theme?.space || { top: "xl", bottom: "xl" }}>
          <Width width="inner">{children}</Width>
        </Spacing>
      </Bleed>
    );
  }

  return null;
};

export default React.memo(Wrapper);
