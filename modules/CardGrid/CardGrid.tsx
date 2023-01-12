import { SliderColorType } from "../../components/Slider/SliderOptions";
import { ButtonProps } from "../../components/buttons/Button";
import PortableText from "../../components/content/PortableText";
import {
  ModuleRadiusType,
  ModuleRoundedType,
} from "../../components/module/BackgroundOptions";
import { SpaceType } from "../../components/module/SpacingOptions";
import { Text } from "../../components/module/Text";
import { Title } from "../../components/module/Title";
import { Wrapper } from "../../components/module/Wrapper";
import { ColorType } from "../../types";
import { CardGridButtons } from "./CardGrid.Buttons";
import { CardGridGridSlider } from "./CardGrid.GridSlider";
import {
  AlignType,
  BackgroundColorType,
  ButtonPositionType,
  ColumnType,
  GapType,
  TitleSizeType,
} from "./CardGridOptions";
import { ComposableCardProps } from "./ComposableCard";
import { ImageCardProps } from "./ImageCard";
import cx from "classnames";
import React from "react";

export type CardGridProps = {
  eyebrow?: string;
  title?: string;
  intro?: React.ReactNode;
  items?: ((ComposableCardProps | ImageCardProps) & { _key?: string })[];
  buttons?: ButtonProps[];
  theme?: {
    module?: {
      space?: SpaceType;
      background?: BackgroundColorType;
      align?: AlignType;
      rounded?: ModuleRoundedType;
    };
    grid?: {
      columns?: ColumnType;
      gapHorizontal?: GapType;
      gapVertical?: GapType;
      stagger?: boolean;
    };
    title?: {
      size?: TitleSizeType;
    };
    buttons?: {
      position?: ButtonPositionType;
    };
    slider?: {
      mobile?: boolean;
      desktop?: boolean;
      color?: SliderColorType;
    };
    decorations?: {
      showOnes?: boolean;
      showLozenges?: boolean;
      roundedTop?: ModuleRadiusType;
      roundedBottom?: ModuleRadiusType;
    };
  };
};

export const CardGrid = ({
  eyebrow,
  title,
  intro,
  items,
  buttons,
  theme,
}: CardGridProps) => {
  // purple background scenario: change overal colouring
  let titleColor: ColorType = "neutral-base";
  let textColor: ColorType = "neutral-25";
  let eyebrowColor: ColorType = "brand-base";
  if (theme?.module?.background === "brand-dark") {
    titleColor = "white";
    textColor = "white";
    eyebrowColor = "brand-light";
  }

  const hasContentBeforeGrid =
    title ||
    intro ||
    (Boolean(buttons?.length) && theme?.buttons?.position !== "after");

  return (
    <div className="overflow-hidden relative">
      <Wrapper
        id={title}
        theme={{
          background: theme?.module?.background,
          space: theme?.module?.space,
          rounded: {
            top: theme?.decorations?.roundedTop,
            bottom: theme?.decorations?.roundedBottom,
          },
        }}
        innerClassName="overflow-hidden"
      >
        <div
          className={cx({
            ["py-8 sm:py-10 lg:py-16 xl:py-30 relative z-20"]:
              theme?.module?.background,
          })}
        >
          <div
            className={cx("max-w-title flex flex-col gap-8", {
              ["md:text-left"]: theme?.module?.align === "left",
              ["md:text-center md:mx-auto"]: theme?.module?.align === "center",
              ["md:text-right md:ml-auto"]: theme?.module?.align === "right",
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
            {intro && (
              <Text
                className={cx({
                  ["md:text-left md:[&>*]:mr-auto"]:
                    theme?.module?.align === "left",
                  ["md:text-center md:[&>*]:mx-auto"]:
                    theme?.module?.align === "center",
                  ["md:text-right md:[&>*]:ml-auto"]:
                    theme?.module?.align === "right",
                })}
                size="lg"
                color={textColor}
                as="div"
                align={null}
              >
                <PortableText content={intro as any} />
              </Text>
            )}

            {buttons && theme?.buttons?.position !== "after" && (
              <CardGridButtons buttons={buttons} theme={theme} />
            )}
          </div>

          {Boolean(items?.length) && (
            <div
              className={cx("text-left", {
                ["mt-10 sm:mt-12 md:mt-16 xl:mt-20"]: hasContentBeforeGrid,
              })}
            >
              <CardGridGridSlider items={items} theme={theme} />
            </div>
          )}

          {buttons && theme?.buttons?.position === "after" && (
            <div
              className={cx({
                ["mt-10 md:mt-12 lg:mt-16 xl:mt-20"]: !items?.length,
              })}
            >
              <CardGridButtons buttons={buttons} theme={theme} />
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default React.memo(CardGrid);
