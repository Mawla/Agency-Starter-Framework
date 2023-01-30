import PortableText from "../../components/content/PortableText";
import { ModuleRadiusType } from "../../components/module/BackgroundOptions";
import { SpaceType } from "../../components/module/SpacingOptions";
import { Text } from "../../components/module/Text";
import { Title } from "../../components/module/Title";
import { WidthType } from "../../components/module/WidthOptions";
import { Wrapper } from "../../components/module/Wrapper";
import { ColorType } from "../../types";
import {
  BackgroundColorType,
  TextAlignType,
  TitleSizeType,
} from "./RichTextOptions";
import cx from "classnames";
import React from "react";

export type RichTextProps = {
  eyebrow?: string;
  title?: string;
  content?: React.ReactElement;
  theme?: {
    module?: {
      space?: SpaceType;
      background?: BackgroundColorType;
      align?: TextAlignType;
      width?: WidthType;
      pullUp?: boolean;
    };
    title?: {
      size?: TitleSizeType;
    };
    decorations?: {
      roundedTop?: ModuleRadiusType;
      roundedBottom?: ModuleRadiusType;
    };
  };
};

export const RichText = ({ eyebrow, title, content, theme }: RichTextProps) => {
  // dark background scenario: change overal colouring
  let titleColor: ColorType = "neutral-base";
  let textColor: ColorType = "neutral-25";
  let eyebrowColor: ColorType = "brand-base";
  let isDarkBackground = false;
  if (
    theme?.module?.background === "brand-dark" ||
    theme?.module?.background === "brand-base" ||
    theme?.module?.background === "blue-dark" ||
    theme?.module?.background === "green-dark"
  ) {
    isDarkBackground = true;
    titleColor = "white";
    textColor = "white";

    eyebrowColor = "brand-light";
    if (
      theme?.module?.background === "blue-dark" ||
      theme?.module?.background === "green-dark"
    ) {
      eyebrowColor = "white";
    }
  }

  return (
    <Wrapper
      theme={{
        width: theme?.module?.width,
        background: theme?.module?.background,
        space: theme?.module?.space,
        pullUp: theme?.module?.pullUp,
        rounded: {
          top: theme?.decorations?.roundedTop,
          bottom: theme?.decorations?.roundedBottom,
        },
      }}
      className="relative"
      innerClassName={cx("overflow-hidden", {
        ["bg-gradient-to-tr from-brand-dark to-brand-base"]:
          theme?.module?.background === "brand-base",
      })}
    >
      <div
        className={cx("z-20 relative", {
          ["py-8 sm:py-10 lg:py-16 xl:py-30"]: theme?.module?.background,
        })}
      >
        <div
          className={cx("max-w-title flex flex-col gap-8", {
            ["md:text-left"]: theme?.module?.align === "left",
            ["md:text-center md:mx-auto"]: theme?.module?.align === "center",
          })}
        >
          {(Boolean(title?.trim().length) ||
            Boolean(eyebrow?.trim().length)) && (
            <Title
              size={theme?.title?.size || "3xl"}
              eyebrow={eyebrow}
              color={titleColor}
              eyebrowColor={eyebrowColor}
            >
              {title}
            </Title>
          )}
          <Text
            align={null}
            background={theme?.module?.background || "white"}
            className={cx({
              ["md:mx-auto"]: theme?.module?.align === "center",
            })}
          >
            <PortableText content={content as any} />
          </Text>
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(RichText);
