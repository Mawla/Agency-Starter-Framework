import { TextProps } from "../../components/block/Text";
import { TitleProps } from "../../components/block/Title";
import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
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
  () => import(/* webpackChunkName: "Title" */ "../../components/block/Title"),
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
      /* webpackChunkName: "ResponsiveImageProps" */ "../../components/images/ResponsiveImage"
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
    };

    intro?: {
      size?: IntroSizeType;
      color?: IntroColorType;
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
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
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
          <div className="bg-white p-4 mt-8 rounded-lg sm:p-12 lg:mt-16 bg-gray-50">
            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
              {Boolean(items?.filter(Boolean).length) &&
                items?.map((item) => {
                  return <Item key={item._key} {...item} />;
                })}
            </div>
          </div>
        )}

        {buttons && Boolean(buttons?.filter(Boolean).length) && (
          <div className="mt-8 lg:mt-16">
            <div className="mt-8 lg:mt-12">
              <ButtonGroup items={buttons} />
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

type ItemProps = {
  title?: string;
  intro?: React.ReactNode;
  image?: ImageType;
  _key?: string;
};
const Item = ({ title, intro, image, _key }: ItemProps) => {
  return (
    <div className="flex flex-col items-start gap-4 sm:gap-5 sm:flex-row">
      <div className="bg-gray-100 rounded-full w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center shrink-0">
        {image && (
          <div className="w-96 relative aspect-video">
            <ResponsiveImage {...image} fill className="absolute inset-0" />
          </div>
        )}
      </div>
      <div>
        {title && (
          <div className="mb-2">
            <Title size={"lg"}>{title}</Title>
          </div>
        )}
        {intro && (
          <div className="mb-10 md:mb-14">
            <Text size={"sm"}>
              <PortableText content={intro as any} />
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Block2);
