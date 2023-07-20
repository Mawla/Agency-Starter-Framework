import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import {
  textAlignClasses,
  TextThemeType,
} from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { ImageType } from "../../types";
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

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

export type Block6Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
  };

  title?: string;
  intro?: React.ReactNode;
  buttons?: ButtonProps[];
  items?: ItemProps[];
};

export const Block6 = ({
  theme,
  title,
  intro,
  buttons,
  items,
}: Block6Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div
        className={cx(
          "max-w-3xl",
          textAlignClasses[theme?.block?.align || "left"],
        )}
      >
        {title && (
          <div className="mb-6">
            <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
              {title}
            </Title>
          </div>
        )}

        {intro && (
          <div className="mb-6">
            <Text
              size={theme?.intro?.size || "xl"}
              color={theme?.intro?.color}
              align={theme?.block?.align || "left"}
            >
              <PortableText content={intro as any} />
            </Text>
          </div>
        )}

        {buttons && Boolean(buttons?.filter(Boolean).length) && (
          <div className="mt-8 lg:mt-12">
            <ButtonGroup items={buttons} />
          </div>
        )}
      </div>

      {items && (
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0  mt-8 lg:mt-16">
          {Boolean(items?.filter(Boolean).length) &&
            items?.map((item) => {
              return <Item key={item._key} {...item} />;
            })}
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
    title?: TitleThemeType;
    intro?: TextThemeType;
  };
};

const Item = ({ title, intro, image, theme }: ItemProps) => {
  return (
    <div className="text-left">
      {image && (
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 relative overflow-hidden">
          <ResponsiveImage {...image} fill className="absolute inset-0" />
        </div>
      )}
      <div>
        {title && (
          <div className="mb-2">
            <Title
              {...theme?.title}
              size={theme?.title?.size || "xl"}
              as={theme?.title?.as || "h3"}
            >
              {title}
            </Title>
          </div>
        )}
        {intro && (
          <Text size={theme?.intro?.size || "md"} color={theme?.intro?.color}>
            <PortableText content={intro as any} />
          </Text>
        )}
      </div>
    </div>
  );
};

export default React.memo(Block6);
