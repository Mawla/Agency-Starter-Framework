import { slugify } from "../../helpers/utils/string";
import { ColorType } from "../../types";
import { Background } from "./Background";
import { Bleed } from "./Bleed";
import { Spacing, SpacingProps } from "./Spacing";
import { Width } from "./Width";
import { BackgroundColorType, BlockRoundedType } from "./background.options";
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
   * with background
   * [spacing top/bottom]
   *   [small bleed]
   *     [full width]
   *       [background]
   *         [medium bleed]
   *           [inner width]
   *             [content]
   */

  if (!theme) theme = {};
  if (!theme?.width) theme.width = "full";

  return (
    <Bleed
      bleed={theme?.width === "full" ? "none" : "sm"}
      id={id ? slugify(id) : ""}
      className={className}
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
            space={{
              top: theme?.space?.top || "md",
              bottom: theme?.space?.bottom || "md",
            }}
          >
            <Bleed bleed="lg">
              <Width width="inner">{children}</Width>
            </Bleed>
          </Spacing>
        </Background>
      </Width>
    </Bleed>
  );
};

export default React.memo(Wrapper);
