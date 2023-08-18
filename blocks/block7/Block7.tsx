import { DecorationProps } from "../../components/block/Decoration";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { LinkProps } from "../../components/buttons/Link";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { MobileScrollerProps } from "../../components/slider/MobileScroller";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { ImageType } from "../../types";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper")
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title")
);

const MobileScroller = lazy<ComponentType<MobileScrollerProps>>(
  () =>
    import(
      /* webpackChunkName: "MobileScroller" */ "../../components/slider/MobileScroller"
    )
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/text/Text")
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    )
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    )
);
const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    )
);

const Link = lazy<ComponentType<LinkProps>>(
  () => import(/* webpackChunkName: "Link" */ "../../components/buttons/Link")
);

type ItemProps = {
  _key?: string;
  image?: ImageType;
  link?: LinkProps;
};

export type Block7Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;

  buttons?: ButtonProps[];
  items?: ItemProps[];
};

export const Block7 = ({
  theme,
  decorations,
  title,
  intro,
  buttons,
  items,
}: Block7Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div
        className={cx(
          "flex flex-col",
          textAlignClasses[theme?.block?.align || "left"]
        )}
      >
        <div className="flex flex-col lg:space-x-16 lg:flex-row">
          <div className="lg:w-3/12 lg:order-first order-last">
            {title && (
              <Title
                className="mt-6 lg:mt-0"
                {...theme?.title}
                size={theme?.title?.size || "4xl"}
              >
                {title}
              </Title>
            )}

            {intro && (
              <Text
                size={theme?.intro?.size || "xl"}
                color={theme?.intro?.color}
                align={theme?.block?.align || "left"}
                className="mt-4"
              >
                <PortableText content={intro as any} />
              </Text>
            )}

            {buttons && Boolean(buttons?.filter(Boolean).length) && (
              <ButtonGroup className="mt-4" items={buttons} />
            )}
          </div>

          <div className="lg:w-9/12">
            {items && Boolean(items?.filter(Boolean).length) && (
              <MobileScroller className="border border-gray-700 flex lg:grid lg:grid-cols-auto lg:grid-flow-col gap-2">
                {items?.map(({ image, _key, link }) =>
                  link ? (
                    <Link {...link}>
                      <Item {...{ image, _key }} />
                    </Link>
                  ) : (
                    <Item {...{ image, _key }} />
                  )
                )}
              </MobileScroller>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Item = ({ _key, image }: Omit<ItemProps, "link">) => {
  return (
    <div className="border lg:max-w-none shrink-0 snap-center">
      <div className="min-h-[200px] relative aspect-[3/4] overflow-hidden rounded-lg">
        {image && <ResponsiveImage className="" key={_key} {...image} fill />}
      </div>
    </div>
  );
};

export default React.memo(Block7);
