import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { shouldRenderPortableText } from "../../helpers/utils/portabletext";
import { backgroundClasses } from "../../theme";
import { ColorType, ImageType } from "../../types";
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

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

export type Block2Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    items?: {
      background?: ColorType;
    };
  };
  decorations?: DecorationProps[];
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
  decorations,
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
      decorations={decorations}
    >
      <div
        className={cx(
          "max-w-4xl",
          alignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <div className="mb-4 md:mb-6">
            <Title {...theme?.title} size={theme?.title?.size || "3xl"}>
              {title}
            </Title>
          </div>
        )}
        {shouldRenderPortableText(intro) && (
          <div className="mb-10 md:mb-14">
            <Text
              align={theme?.block?.align || "center"}
              size={theme?.intro?.size || "xl"}
              color={theme?.intro?.color}
              weight={theme?.intro?.weight}
            >
              <PortableText content={intro as PortableTextBlock[]} />
            </Text>
          </div>
        )}
      </div>

      {items && (
        <div
          className={cx(
            "mt-8 rounded-lg lg:mt-16",
            theme?.items?.background &&
              backgroundClasses[theme?.items?.background],
            {
              ["p-4 sm:p-12 "]: theme?.items?.background,
            },
          )}
        >
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:gap-20 lg:grid-cols-2">
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
            "max-w-4xl",
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
    title?: TitleThemeType;
    intro?: TextThemeType;
  };
};
const Item = ({ title, intro, image, theme }: ItemProps) => {
  return (
    <div className="flex flex-col items-start gap-4 sm:gap-5 sm:flex-row">
      {image && (
        <div className="rounded-full w-16 lg:w-24 flex items-center justify-center shrink-0 relative aspect-square">
          <ResponsiveImage {...image} fill className="absolute inset-0" />
        </div>
      )}
      <div>
        {title && (
          <div className="mb-2">
            <Title
              {...theme?.title}
              size={theme?.title?.size || "lg"}
              as={theme?.title?.as || "h3"}
            >
              {title}
            </Title>
          </div>
        )}
        {shouldRenderPortableText(intro) && (
          <Text
            size={theme?.intro?.size || "md"}
            color={theme?.intro?.color}
            weight={theme?.intro?.weight}
          >
            <PortableText content={intro as PortableTextBlock[]} />
          </Text>
        )}
      </div>
    </div>
  );
};

export default React.memo(Block2);
