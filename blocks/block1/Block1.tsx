import Spacing from "../../components/block/Spacing";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { DecorationProps } from "../../components/decorations/Decoration";
import { DecorationsProps } from "../../components/decorations/Decorations";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { ScriptsType } from "../../components/script/Script";
import { TextProps } from "../../components/text/Text";
import {
  TextThemeType,
  textAlignClasses,
} from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { VideoProps } from "../../components/video/Video";
import { getOriginalImageDimensions } from "../../helpers/sanity/image-url";
import { shouldRenderPortableText } from "../../helpers/utils/portabletext";
import { BREAKPOINTS, useBreakpoint } from "../../hooks/useBreakpoint";
import { useSize } from "../../hooks/useSize";
import { borderRadiusClasses } from "../../theme";
import {
  BorderRadiusType,
  HorizontalAlignType,
  ImageType,
  VerticalAlignType,
  VideoType,
} from "../../types";
import {
  GapType,
  gapClasses,
  layoutColumnType,
  mediaPositionType,
} from "./block1.options";
import cx from "clsx";
import React, {
  CSSProperties,
  ComponentType,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
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

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const Video = lazy<ComponentType<VideoProps>>(
  () => import(/* webpackChunkName: "Video" */ "../../components/video/Video"),
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    ),
);

const Decorations = lazy<ComponentType<DecorationsProps>>(
  () =>
    import(
      /* webpackChunkName: "Decorations" */ "../../components/decorations/Decorations"
    ),
);

const Scripts = lazy<ComponentType<ScriptsType>>(
  () =>
    import(/* webpackChunkName: "Scripts" */ "../../components/script/Script"),
);

export type Block1Props = {
  theme?: {
    block?: BlockThemeType;
    layout?: {
      columns?: layoutColumnType;
      gap?: GapType;
      mediaPosition?: mediaPositionType;
      verticalAlign?: VerticalAlignType;
      extendMediaWidth?: boolean;
    };
    image?: {
      fullHeight?: boolean;
      rounded?: BorderRadiusType;
    };
    content?: {
      verticalSpace?: SpaceType;
    };
    title?: TitleThemeType;
    intro?: TextThemeType;
    body?: TextThemeType;
    footer?: TextThemeType;
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  image?: ImageType;
  mobileImage?: ImageType;
  video?: VideoType;
  script?: ScriptsType;
  buttons?: ButtonProps[];
};

export const verticalAlignClasses: Record<VerticalAlignType, string> = {
  top: "lg:items-start",
  middle: "lg:items-center",
  bottom: "lg:items-end",
};

export const horizontalAlignClasses: Record<HorizontalAlignType, string> = {
  left: "",
  center: "mx-auto",
  right: "ml-auto",
};

export const gridColClasses: Record<layoutColumnType, string> = {
  "1/2": "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
  "1/4": "lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]",
  "3/4": "lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]",
  "1/3": "lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
  "2/3": "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]",
  "5/7": "lg:grid-cols-[minmax(0,5fr)_minmax(0,2fr)]",
  "2/7": "lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]",
  "5/8": "lg:grid-cols-[minmax(0,5fr)_minmax(0,3fr)]",
  "3/8": "lg:grid-cols-[minmax(0,3fr)_minmax(0,5fr)]",
};

export const Block1 = ({
  theme,
  decorations,
  title,
  intro,
  body,
  footer,
  image,
  mobileImage,
  video,
  buttons,
  script,
}: Block1Props) => {
  const { screenWidth } = useBreakpoint();

  const gridRef = useRef(null);
  const containerWidthRef = useRef(null);
  const contentWidthRef = useRef(null);
  const { width: containerWidth } = useSize(containerWidthRef);
  const { width: contentWidth } = useSize(contentWidthRef);
  const [gapSize, setGapSize] = useState<number>(120);

  let mediaPositionStyle: CSSProperties = { width: "100%" };

  if (screenWidth > BREAKPOINTS.lg) {
    if (
      theme?.layout?.extendMediaWidth === true &&
      contentWidth &&
      containerWidth
    ) {
      // Calculate the width of the media column
      const columns = theme?.layout?.columns?.split("/") || "1/2";
      const leftColumn = +columns[0];
      const totalColumns = +columns[1];
      const rightColumn = +columns[1] - leftColumn;
      const mediaColumn =
        theme?.layout?.mediaPosition === "left" ? leftColumn : rightColumn;

      const columnWidth =
        ((contentWidth - gapSize) / totalColumns) * mediaColumn;

      // Calculate the width of to be filled
      const fillWidth = (containerWidth - contentWidth) / 2;
      mediaPositionStyle.width = columnWidth + fillWidth;

      // pull left
      if (theme?.layout?.mediaPosition === "left") {
        mediaPositionStyle.marginLeft = -fillWidth;
      }
    }
  }

  if (screenWidth < BREAKPOINTS.lg) {
    image = mobileImage || image;
  }

  // find gap size
  useEffect(() => {
    if (!gridRef.current) return;
    let gapSize = window
      .getComputedStyle(gridRef.current, null)
      .getPropertyValue("gap")
      .split(" ")[1]
      ?.replace("px", "");
    setGapSize(+gapSize);
  }, []);

  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
      slots={{
        insideSpacing: <div ref={containerWidthRef} />,
        insideWidth: <div ref={contentWidthRef} />,
      }}
    >
      <div
        ref={gridRef}
        className={cx(
          "gap-8 grid lg:grid-cols-12",
          gridColClasses[theme?.layout?.columns || "1/2"],
          gapClasses[theme?.layout?.gap || "lg"],
        )}
      >
        <Spacing
          padding={theme?.content?.verticalSpace}
          className={cx(
            "order-2 flex pt-0 sm:pt-0 md:pt-0 pb-0 sm:pb-0 md:pb-0 relative z-20",
            theme?.layout?.verticalAlign &&
              verticalAlignClasses[theme.layout.verticalAlign],
            theme?.block?.align &&
              textAlignClasses[theme?.block?.align || "left"],
          )}
        >
          <div className="flex flex-col gap-8">
            {title && (
              <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
                {title}
              </Title>
            )}
            {shouldRenderPortableText(intro) && (
              <Text
                size={theme?.intro?.size || "lg"}
                color={theme?.intro?.color}
                weight={theme?.intro?.weight}
                font={theme?.intro?.font}
                align={theme?.block?.align || "left"}
              >
                <PortableText content={intro as PortableTextBlock[]} />
              </Text>
            )}

            {shouldRenderPortableText(body) && (
              <Text
                size={theme?.body?.size || "lg"}
                color={theme?.body?.color}
                weight={theme?.body?.weight}
                font={theme?.body?.font}
                align={theme?.block?.align || "left"}
              >
                <PortableText content={body as PortableTextBlock[]} />
              </Text>
            )}

            {buttons && Boolean(buttons?.filter(Boolean).length) && (
              <div
                className={cx(
                  theme?.block?.align &&
                    textAlignClasses[theme?.block?.align || "left"],
                )}
              >
                <ButtonGroup items={buttons} />
              </div>
            )}
            {footer && (
              <Text
                size={theme?.footer?.size || "lg"}
                color={theme?.footer?.color}
                weight={theme?.footer?.weight}
              >
                <PortableText content={footer as PortableTextBlock[]} />
              </Text>
            )}
          </div>
        </Spacing>

        {!image && !video && !script && <div />}

        {(image || video) && (
          <div
            className={cx(
              "w-full z-10 mt-10 lg:mt-0 lg:flex relative lg:h-full max-w-[650px] lg:max-w-none",
              theme?.layout?.verticalAlign &&
                verticalAlignClasses[theme.layout.verticalAlign],
              theme?.block?.align &&
                horizontalAlignClasses[theme?.block?.align],
              {
                ["order-3"]: theme?.layout?.mediaPosition !== "left",
                ["order-1"]: theme?.layout?.mediaPosition === "left",
              },
            )}
            style={mediaPositionStyle}
          >
            {image && (
              <div className="relative h-full w-full">
                <div
                  className={cx(
                    "relative flex w-full h-full",
                    theme?.layout?.verticalAlign &&
                      verticalAlignClasses[theme.layout.verticalAlign],
                    theme?.layout?.mediaPosition !== "left" && "lg:justify-end",
                  )}
                >
                  <div
                    className={cx("relative w-full", {
                      ["lg:h-full"]: theme?.image?.fullHeight,
                    })}
                    style={{
                      maxWidth:
                        getOriginalImageDimensions(image?.src).width || "auto",
                      aspectRatio:
                        !theme?.image?.fullHeight ||
                        screenWidth < BREAKPOINTS.lg
                          ? getOriginalImageDimensions(image?.src)
                              .aspectRatio || "auto"
                          : undefined,
                    }}
                    data-animate={
                      theme?.layout?.mediaPosition === "left"
                        ? "zoom-in-right"
                        : "zoom-in-left"
                    }
                  >
                    <ResponsiveImage
                      {...image}
                      fill
                      className={cx(
                        theme?.image?.rounded &&
                          borderRadiusClasses[theme?.image?.rounded],
                        theme?.image?.fullHeight ? "absolute inset-0" : "",
                      )}
                      roundSize={25}
                    />
                    <Decorations decorations={decorations} location="image" />
                  </div>
                </div>
              </div>
            )}
            {video && (
              <div
                className={cx(
                  "w-full h-full flex",
                  theme?.layout?.verticalAlign &&
                    verticalAlignClasses[theme.layout.verticalAlign],
                )}
              >
                <div className="w-full">
                  <div className="relative w-full h-auto">
                    <Video
                      {...video}
                      className={cx(
                        "w-full",
                        theme?.image?.rounded && "overflow-hidden",
                        theme?.image?.rounded &&
                          borderRadiusClasses[theme?.image?.rounded],
                      )}
                    />
                    <Decorations decorations={decorations} location="image" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {script && (
          <div
            className={cx(
              "w-full flex relative",
              "[&>div]:w-full [&>div>div]:w-full",
              theme?.layout?.verticalAlign &&
                verticalAlignClasses[theme.layout.verticalAlign],
              {
                ["order-3"]: theme?.layout?.mediaPosition !== "left",
                ["order-1"]: theme?.layout?.mediaPosition === "left",
              },
            )}
            style={mediaPositionStyle}
          >
            <Scripts
              key={script.title}
              title={script.title}
              items={script.items}
            />
            <Decorations decorations={decorations} location="image" />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block1);
