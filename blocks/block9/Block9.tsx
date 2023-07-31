import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { VideoProps } from "../../components/video/Video";
import { textAlignClasses } from "../../theme";
import { VideoType } from "../../types";
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

const Video = lazy<ComponentType<VideoProps>>(
  () => import(/* webpackChunkName: "Video" */ "../../components/video/Video"),
);

export type Block9Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
  };

  title?: string;
  intro?: React.ReactNode;
  video?: VideoType;
  buttons?: ButtonProps[];
};

export const Block9 = ({
  theme,
  title,
  intro,
  video,
  buttons,
}: Block9Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <div
          className={cx(
            "max-w-3xl",
            textAlignClasses[theme?.block?.align || "center"],
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
                align={theme?.block?.align || "center"}
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

        {video && (
          <div className="overflow-hidden rounded-xs">
            <Video {...video} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block9);
