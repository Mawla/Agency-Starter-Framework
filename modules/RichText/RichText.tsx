import { Lozenge, LozengeProps } from "../../components/Decorations/Lozenge";
import { One } from "../../components/Decorations/One";
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
      showOnes?: boolean;
      showLozenges?: boolean;
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

  let oneColor: LozengeProps["color"] = "brand-base";
  if (theme?.module?.background === "blue-dark") {
    oneColor = "blue-base";
  }
  if (theme?.module?.background === "green-dark") {
    oneColor = "green-base";
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
      {(theme?.decorations?.showOnes || theme?.decorations?.showLozenges) && (
        <div className="absolute inset-0 hidden md:block pointer-events-none">
          {theme?.decorations?.showOnes && (
            <>
              <One
                direction="up"
                color={oneColor}
                className="absolute top-20 left-0 scale-75 xl:scale-100 -translate-x-[95%] xl:-translate-x-[100%] 2xl:-translate-x-[77%]"
              />
              <One
                direction="down"
                color={oneColor}
                className="absolute right-0 -bottom-16 scale-75 xl:scale-100 translate-x-[100%] 2xl:translate-x-[88%]"
              />
            </>
          )}
          {theme?.decorations?.showLozenges && (
            <>
              <Lozenge
                color={
                  theme?.module?.background === "neutral-95"
                    ? "white"
                    : "neutral-95"
                }
                size="lg"
                rotation={11}
                className={cx(
                  "absolute right-0 md:right-[10%] top-0 md:top-[10%]",
                  {
                    ["opacity-10"]: isDarkBackground,
                  }
                )}
              />
              <Lozenge
                color={
                  theme?.module?.background === "brand-dark"
                    ? "white"
                    : "action-light"
                }
                size="md"
                rotation={2}
                className={cx("absolute hidden md:block left-[10%] top-[50%]", {
                  ["opacity-10"]: isDarkBackground,
                })}
              />
            </>
          )}
        </div>
      )}

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
