import { TextProps } from "../../components/block/Text";
import { TitleProps } from "../../components/block/Title";
import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroup } from "../../components/buttons/ButtonGroup";
import { ResponsiveImage } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { HeadingLevelType, ImageType } from "../../types";
import {
  TitleSizeType,
  TitleColorType,
  IntroColorType,
  IntroSizeType,
  AlignType,
} from "./block8.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper")
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/block/Title")
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/block/Text")
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    )
);

export type Block8Props = {
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
      color?: IntroColorType;
      size?: IntroSizeType;
    };
  };

  title?: string;
  intro?: React.ReactNode;

  items?: ItemProps[];
};

const alignClasses: Record<AlignType, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export const Block8 = ({
  theme,

  title,
  intro,

  items,
}: Block8Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div
        className={cx(
          "max-w-3xl",
          alignClasses[theme?.block?.align || "center"]
        )}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center sm:py-16 lg:px-6">
          {title && (
            <div
              className={`mb-6 ${
                alignClasses[theme?.block?.align || "center"]
              }`}
            >
              <Title
                size={theme?.title?.size || "4xl"}
                as={theme?.title?.level}
                color={theme?.title?.color}
              >
                {title}
              </Title>
            </div>
          )}

          {intro && (
            <div className="mb-6">
              <Text
                size={theme?.intro?.size || "lg"}
                color={theme?.intro?.color}
                align={theme?.block?.align || "center"}
              >
                <PortableText content={intro as any} />
              </Text>
            </div>
          )}

          <div className="flex flex-row mt-8 space-x-24">
            {items &&
              Boolean(items?.filter(Boolean).length) &&
              items?.map((item: ItemProps) => (
                <Item key={item._key} align={theme?.block?.align} {...item} />
              ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

type ItemProps = {
  _key: string;
  title: string;
  intro?: React.ReactNode;
  image?: ImageType;
  buttons?: ButtonProps[];
  align?: AlignType;
};

const Item = ({ _key, title, intro, image, buttons, align }: ItemProps) => {
  return (
    <div>
      {image && (
        <div className="mt-6">
          <ResponsiveImage {...image} className="inline-block" />
        </div>
      )}

      {title && (
        <div className={`mb-2 ${alignClasses[align || "center"]}`}>
          <Title size={"xl"}>{title}</Title>
        </div>
      )}

      {intro && (
        <div className="mb-6">
          <Text align={align} size={"sm"}>
            <PortableText content={intro as any} />
          </Text>
        </div>
      )}

      {buttons && Boolean(buttons?.filter(Boolean).length) && (
        <div className="mt-6">
          <ButtonGroup items={buttons} />
        </div>
      )}
    </div>
  );
};

export default React.memo(Block8);
