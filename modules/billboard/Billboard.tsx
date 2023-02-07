import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { WidthProps } from "../../components/module/Width";
import { WrapperProps } from "../../components/module/Wrapper";
import { SpaceType } from "../../components/module/spacing.options";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { HeadingLevelType, ImageType } from "../../types";
import { AlignType } from "./BillboardOptions";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImageProps" */ "../../components/images/ResponsiveImage"
    ),
);

const Width = lazy<ComponentType<WidthProps>>(
  () => import(/* webpackChunkName: "Width" */ "../../components/module/Width"),
);

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    ),
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    ),
);

export type BillboardProps = {
  eyebrow?: string;
  title?: string;
  content?: React.ReactNode;
  image?: ImageType;
  buttons?: ButtonProps[];
  theme?: {
    module?: {
      space?: SpaceType;
    };
    title?: {
      level?: HeadingLevelType;
    };
    image?: {
      align?: AlignType;
    };
  };
};

export const Billboard = ({
  theme,
  eyebrow,
  title,
  content,
  image,
  buttons,
}: BillboardProps) => {
  return (
    <Wrapper
      id={title}
      theme={{
        background: "neutral-500",
        space: theme?.module?.space,
        rounded: { top: "md", bottom: "md" },
      }}
      innerClassName="overflow-hidden"
    >
      <Width className="relative z-30 py-10 md:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2">
        <div
          className={cx(
            "flex flex-col gap-6 lg:gap-8 justify-center z-30 row-start-2 max-w-[600px]",
            {
              ["md:col-start-1"]: theme?.image?.align === "right",
              ["md:col-start-2"]: theme?.image?.align === "left",
            },
          )}
        >
          {/* no content: add placeholder to size the image */}
          {!title && !content && !buttons && (
            <div className="w-full aspect-[16/9]" />
          )}

          {(title || eyebrow) && (
            <Title
              size="2xl"
              color="white"
              eyebrowColor="white"
              as={theme?.title?.level}
              eyebrow={eyebrow}
            >
              {title}
            </Title>
          )}

          {content && (
            <Text font="heading" size="md" color="white" as="div" align={null}>
              <PortableText content={content as any} />
            </Text>
          )}
          {buttons && (
            <div className="mt-4">
              <ButtonGroup
                stretch={false}
                direction="horizontal"
                items={buttons}
              />
            </div>
          )}
        </div>

        <div className="relative md:static h-[200px] md:h-auto mb-4 md:mb-0">
          {image && (
            <div
              className={cx(
                "h-full aspect-square pointer-events-none z-20",
                "absolute top-0 left-1/2 -translate-x-1/2 md:-bottom-16 md:h-[90%] md:translate-x-0 md:top-auto",
                {
                  ["md:-left-16 lg:-left-24 xl:left-12"]:
                    theme?.image?.align === "left",
                  ["md:left-1/2 md:translate-x-10"]:
                    theme?.image?.align !== "left",
                },
              )}
            >
              <ResponsiveImage {...image} fill />
            </div>
          )}
        </div>
      </Width>
    </Wrapper>
  );
};

export default React.memo(Billboard);
