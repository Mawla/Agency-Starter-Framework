import { TextProps } from "../../components/block/Text";
import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TitleProps } from "../../components/title/Title";
import {
  TitleFontType,
  TitleWeightType,
} from "../../components/title/title.options";
import { backgroundClasses } from "../../theme";
import { HeadingLevelType, ImageType } from "../../types";
import {
  TitleSizeType,
  TitleColorType,
  IntroColorType,
  IntroSizeType,
  AlignType,
} from "./block2.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/block/Text"),
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

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

export type Block2Props = {
  theme?: {
    block?: {
      background?: BackgroundColorType;
      space?: SpaceType;
      align?: AlignType;
    };

    title?: {
      color?: TitleColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType;
      font?: TitleFontType;
      weight?: TitleWeightType;
    };

    intro?: {
      size?: IntroSizeType;
      color?: IntroColorType;
    };

    items?: {
      background?: BackgroundColorType;
    };
  };

  title?: string;
  intro?: React.ReactNode;
  buttons?: ButtonProps[];
  items?: ItemProps[];
};

const alignClasses = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export const Block2 = ({
  theme,
  title,
  intro,
  buttons,
  items,
}: Block2Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div
        className={cx(
          "max-w-3xl",
          alignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <div className="mb-4 md:mb-6">
            <Title
              size={theme?.title?.size || "3xl"}
              as={theme?.title?.level}
              color={theme?.title?.color}
              font={theme?.title?.font}
              weight={theme?.title?.weight}
            >
              {title}
            </Title>
          </div>
        )}
        {intro && (
          <div className="mb-10 md:mb-14">
            <Text
              align={theme?.block?.align || "center"}
              size={theme?.intro?.size || "xl"}
              color={theme?.intro?.color}
            >
              <PortableText content={intro as any} />
            </Text>
          </div>
        )}
      </div>

      {items && (
        <div
          className={cx(
            "p-4 mt-8 rounded-lg sm:p-12 lg:mt-16 bg-gray-50",
            backgroundClasses[theme?.items?.background || "white"],
          )}
        >
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
            {Boolean(items?.filter(Boolean).length) &&
              items?.map((item) => {
                return <Item key={item._key} {...item} />;
              })}
          </div>
        </div>
      )}

      {buttons && Boolean(buttons?.filter(Boolean).length) && (
        <div
          className={cx(
            "max-w-3xl",
            alignClasses[theme?.block?.align || "center"],
            "mt-8 lg:mt-16",
          )}
        >
          <ButtonGroup
            items={buttons}
            align={theme?.block?.align || "center"}
          />
        </div>
      )}
    </Wrapper>
  );
};

type ItemProps = {
  title?: string;
  intro?: React.ReactNode;
  image?: ImageType;
  _key?: string;
  theme?: {
    title?: {
      size?: TitleSizeType;
      color?: TitleColorType;
      level?: HeadingLevelType;
    };
    intro?: {
      size?: IntroSizeType;
      color?: IntroColorType;
    };
  };
};
const Item = ({ title, intro, image, theme }: ItemProps) => {
  return (
    <div className="flex flex-col items-start gap-4 sm:gap-5 sm:flex-row">
      {image && (
        <div className="bg-gray-100 rounded-full w-16 lg:w-24 flex items-center justify-center shrink-0 relative aspect-square">
          <ResponsiveImage {...image} fill className="absolute inset-0" />
        </div>
      )}
      <div>
        {title && (
          <div className="mb-2">
            <Title
              size={theme?.title?.size || "lg"}
              color={theme?.title?.color}
              as={theme?.title?.level || "h3"}
            >
              {title}
            </Title>
          </div>
        )}
        {intro && (
          <Text size={theme?.intro?.size || "sm"} color={theme?.intro?.color}>
            <PortableText content={intro as any} />
          </Text>
        )}
      </div>
    </div>
  );
};

export default React.memo(Block2);
