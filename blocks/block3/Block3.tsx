import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { shouldRenderPortableText } from "../../helpers/utils/portabletext";
import { bumpHeadingLevel } from "../../helpers/utils/string";
import {
  backgroundClasses,
  borderClasses,
  borderRadiusClasses,
  borderWidthClasses,
  paddingXClasses,
  paddingYClasses,
  textClasses,
} from "../../theme";
import {
  BorderRadiusType,
  BorderWidthType,
  ColorType,
  HtmlTextNodeType,
  ImageType,
  PaddingType,
} from "../../types";
import { ColumnType, gridClasses } from "./block3.classes";
import cx from "clsx";
import React, { ComponentType, lazy } from "react";
import { PortableTextBlock } from "sanity";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/text/Text"),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    ),
);

export type Block3Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    plans?: {
      card?: {
        color?: ColorType;
        background?: ColorType;
        padding?: PaddingType;
      };
      title?: TitleThemeType;
      description?: TextThemeType;
      features?: TextThemeType;
      amount?: TitleThemeType;
      unit?: TextThemeType;
      border?: {
        color?: ColorType;
        radius?: BorderRadiusType;
        width?: BorderWidthType;
      };
    };
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  plans?: {
    _id?: string;
    title?: string;
    description?: string;
    price?: {
      amount?: string;
      unit?: string;
    };
    features?: React.ReactNode;
    buttons?: ButtonProps[];
    image?: ImageType;
  }[];
};

export const Block3 = ({
  theme,
  decorations,
  title,
  intro,
  plans,
}: Block3Props) => {
  let columns = ((plans?.length || 0) % 4) as ColumnType;
  if (plans && plans.length > 4) columns = 4;

  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div
        className={cx(
          "flex flex-col gap-6 max-w-4xl",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
            {title}
          </Title>
        )}

        {shouldRenderPortableText(intro) && (
          <Text
            size={theme?.intro?.size || "xl"}
            color={theme?.intro?.color}
            weight={theme?.intro?.weight}
            align={theme?.block?.align || "center"}
          >
            <PortableText content={intro as PortableTextBlock[]} />
          </Text>
        )}
      </div>

      {plans && Boolean(plans?.filter(Boolean).length) && (
        <div
          className={cx("grid gap-4", gridClasses[columns], {
            "mt-8": title || shouldRenderPortableText(intro),
          })}
        >
          {plans?.map(
            ({ title, description, price, _id, buttons, features }) => (
              <div
                key={_id}
                className={cx(
                  "flex flex-col gap-4 text-left",
                  theme?.plans?.card?.background &&
                    backgroundClasses[theme?.plans?.card?.background],
                  theme?.plans?.card?.color &&
                    textClasses[theme?.plans?.card?.color],
                  theme?.plans?.card?.padding
                    ? paddingXClasses[theme?.plans?.card?.padding]
                    : "px-8",
                  theme?.plans?.card?.padding
                    ? paddingYClasses[theme?.plans?.card?.padding]
                    : "py-8",
                  theme?.plans?.border?.color && "border",
                  theme?.plans?.border?.color &&
                    borderClasses[theme?.plans?.border?.color],
                  theme?.plans?.border?.color &&
                    borderWidthClasses[theme?.plans?.border?.width || 1],
                  theme?.plans?.border?.radius &&
                    borderRadiusClasses[theme?.plans?.border?.radius],
                  {
                    "col-start-2": columns === 1,
                  },
                )}
              >
                {title && (
                  <Title
                    as={
                      bumpHeadingLevel(
                        theme?.title?.as || "h2",
                      ) as HtmlTextNodeType
                    }
                    {...theme?.plans?.title}
                    size={theme?.plans?.title?.size || "3xl"}
                  >
                    {title}
                  </Title>
                )}
                {description && (
                  <Text
                    as="p"
                    {...theme?.plans?.description}
                    size={theme?.plans?.description?.size || "md"}
                  >
                    {description}
                  </Text>
                )}

                {price?.amount && (
                  <Title
                    as="span"
                    {...theme?.plans?.amount}
                    size={theme?.plans?.amount?.size || "5xl"}
                  >
                    {price.amount}
                  </Title>
                )}
                {price?.unit && (
                  <Text
                    className="-mt-3"
                    as="p"
                    {...theme?.plans?.unit}
                    size={theme?.plans?.unit?.size || "sm"}
                  >
                    {price.unit}
                  </Text>
                )}

                {buttons && Boolean(buttons?.filter(Boolean).length) && (
                  <ButtonGroup items={buttons} className="mt-4 mb-6" />
                )}

                {features && (
                  <Text
                    {...theme?.plans?.features}
                    size={theme?.plans?.features?.size || "md"}
                  >
                    <PortableText content={features as PortableTextBlock[]} />
                  </Text>
                )}
              </div>
            ),
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(Block3);
