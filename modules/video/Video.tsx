import FigCaption from "../../components/images/FigCaption";
import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { WrapperProps } from "../../components/module/Wrapper";
import { BackgroundColorType } from "../../components/module/background.options";
import { SpaceType } from "../../components/module/spacing.options";
import PortableText from "../../components/portabletext/PortableText";
import { VideoProps as VideoComponentProps } from "../../components/video/Video";
import { ColorType, HeadingLevelType, VideoType } from "../../types";
import { TitleSizeType } from "./video.options";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
);

const VideoComponent = lazy<ComponentType<VideoComponentProps>>(
  () => import(/* webpackChunkName: "Video" */ "../../components/video/Video"),
);

export type VideoProps = {
  theme?: {
    module?: {
      background?: BackgroundColorType;
      space?: SpaceType;
    };
    title?: {
      color?: ColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType;
    };
    text?: {
      color?: ColorType;
    };
  };
  eyebrow?: string;
  title?: string;
  intro?: React.ReactNode;
  video?: VideoType;
};

export const Video = ({ theme, eyebrow, title, intro, video }: VideoProps) => {
  return (
    <Wrapper
      theme={{
        ...theme?.module,
      }}
    >
      {title && (
        <div className="mb-4 md:mb-6">
          <Title
            size={theme?.title?.size || "lg"}
            as={theme?.title?.level}
            color={theme?.title?.color}
            eyebrow={eyebrow}
          >
            {title}
          </Title>
        </div>
      )}

      {intro && (
        <div className="mb-10 md:mb-14">
          <Text color={theme?.text?.color}>
            <PortableText content={intro as any} />
          </Text>
        </div>
      )}

      {video && (
        <figure>
          <VideoComponent {...video} />

          {video.caption && (
            <FigCaption caption={video.caption} className="mt-2" />
          )}
        </figure>
      )}
    </Wrapper>
  );
};

export default React.memo(Video);
