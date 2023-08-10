import { DecorationProps } from "../../components/block/Decoration";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import {
  ComposableCard,
  ComposableCardProps,
} from "../../components/cards/ComposableCard";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { SliderProps } from "../../components/slider/Slider";
import { SliderColorType } from "../../components/slider/slider.options";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import {
  BREAKPOINTS,
  BreakpointType,
  useBreakpoint,
} from "../../hooks/useBreakpoint";
import ErrorBoundary from "../../layout/pagebuilder/ErrorBoundary";
import {
  gapHorizontalClasses,
  gapVerticalClasses,
  gridCenterClasses,
  gridClasses,
} from "./block18.classes";
import { ButtonPositionType, ColumnType, GapType } from "./block18.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Slider = lazy<ComponentType<SliderProps>>(
  () =>
    import(/* webpackChunkName: "Slider" */ "../../components/slider/Slider"),
);

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

export type Block18Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    grid?: {
      columns?: ColumnType;
      gapHorizontal?: GapType;
      gapVertical?: GapType;
    };
    slider?: {
      mobile?: boolean;
      desktop?: boolean;
      color?: SliderColorType;
    };
    buttons?: {
      position?: ButtonPositionType;
    };
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  buttons?: ButtonProps[];
  items?: ComposableCardProps[];
};

export const Block18 = ({
  theme,
  decorations,
  title,
  intro,
  buttons,
  items,
}: Block18Props) => {
  const { screenWidth, breakpoint } = useBreakpoint();

  const filteredItems = items?.filter(Boolean);

  let slideColumns = 1;
  if (screenWidth > BREAKPOINTS.xs) slideColumns = 1;
  if (screenWidth > BREAKPOINTS.sm) slideColumns = 2;
  if (screenWidth > BREAKPOINTS.md)
    slideColumns =
      theme?.grid?.columns && theme?.grid?.columns < 3
        ? theme?.grid?.columns
        : 3;
  if (screenWidth > BREAKPOINTS.lg) slideColumns = theme?.grid?.columns || 3;

  // show half of an extra slide if needed
  if (filteredItems && filteredItems?.length > slideColumns) {
    slideColumns = +slideColumns + (screenWidth > BREAKPOINTS.md ? 0.25 : 0.5);
  }

  // slider on mobile by default, adjustable by theme
  let slider = false;
  if (screenWidth < BREAKPOINTS.lg && theme?.slider?.mobile !== false)
    slider = true;
  if (screenWidth > BREAKPOINTS.lg && theme?.slider?.desktop === true)
    slider = true;

  // read the gap size from the tailwind classes to make grid gaps stay in sync between slider and grid layouts
  const sliderGapSize: number = getSliderGapSize(
    breakpoint,
    theme?.grid?.gapHorizontal || "xs",
  );

  const hasContentBeforeGrid =
    title ||
    intro ||
    (Boolean(buttons?.length) && theme?.buttons?.position !== "after");

  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
      innerClassName="overflow-x-hidden"
    >
      <div
        className={cx(
          "flex flex-col gap-6 max-w-3xl",
          theme?.block?.align && textAlignClasses[theme?.block?.align],
        )}
      >
        {title && (
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
            {title}
          </Title>
        )}

        {intro && (
          <Text
            size={theme?.intro?.size || "xl"}
            color={theme?.intro?.color}
            align={theme?.block?.align}
          >
            <PortableText content={intro as any} />
          </Text>
        )}

        {/* buttons before */}
        {buttons &&
          theme?.buttons?.position !== "after" &&
          Boolean(buttons?.filter(Boolean).length) && (
            <div className="mt-6">
              <Block18Buttons buttons={buttons} theme={theme} />
            </div>
          )}
      </div>

      {Boolean(filteredItems?.length) && (
        <div
          className={cx(
            theme?.block?.align
              ? textAlignClasses[theme?.block?.align]
              : "text-left",
            {
              ["mt-10 sm:mt-12 md:mt-16 xl:mt-20"]: hasContentBeforeGrid,
            },
          )}
        >
          {slider ? (
            <Slider
              gap={sliderGapSize}
              columns={slideColumns}
              slides={filteredItems?.map((item) => (
                <div key={item._key} className="h-full text-left">
                  <CardWrapper>
                    <ComposableCard {...item} key={item._key} />
                  </CardWrapper>
                </div>
              ))}
              controlsColor={theme?.slider?.color}
            />
          ) : (
            <div
              className={cx(
                "grid",
                theme?.grid?.columns && gridClasses[theme?.grid?.columns],
                theme?.grid?.gapHorizontal &&
                  gapHorizontalClasses[theme?.grid?.gapHorizontal],
                theme?.grid?.gapVertical &&
                  gapVerticalClasses[theme?.grid?.gapVertical],
                theme?.grid?.columns &&
                  theme?.block?.align === "center" &&
                  gridCenterClasses[theme?.grid?.columns],
              )}
            >
              {filteredItems?.map((item, i) => {
                return (
                  <div key={item._key} className="h-full text-left">
                    <CardWrapper>
                      <ComposableCard {...item} />
                    </CardWrapper>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* buttons after */}
      <div
        className={cx(
          "flex flex-col gap-6 max-w-3xl",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {buttons &&
          theme?.buttons?.position === "after" &&
          Boolean(buttons?.filter(Boolean).length) && (
            <div className="mt-6">
              <Block18Buttons buttons={buttons} theme={theme} />
            </div>
          )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block18);

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense>
    <ErrorBoundary>{children}</ErrorBoundary>
  </React.Suspense>
);

const getSliderGapSize = (
  breakpoint: BreakpointType,
  gapHorizontal: GapType,
): number => {
  const sliderGapSizes: Record<BreakpointType, number> = gapHorizontalClasses[
    gapHorizontal
  ]
    .split(" ")
    .reduce((acc, curr) => {
      const breakpoint = (curr.match(/(.*):/)?.[1] || "xs") as BreakpointType;
      const gap = +(curr as any).match(/\d+$/)[0] * 4;
      return { ...acc, [breakpoint]: gap };
    }, {} as Record<BreakpointType, number>);
  return sliderGapSizes[breakpoint];
};

type Block18ButtonsProps = {
  buttons?: Block18Props["buttons"];
  theme?: Block18Props["theme"];
};

const Block18Buttons = ({ buttons, theme }: Block18ButtonsProps) => {
  const { screenWidth } = useBreakpoint();
  if (!buttons) return null;

  return (
    <div
      className={cx("flex", {
        ["justify-start"]: theme?.block?.align === "left",
        ["justify-center"]: theme?.block?.align === "center",
        ["justify-end"]: theme?.block?.align === "right",
      })}
    >
      <ButtonGroup
        items={buttons}
        stretch={false}
        direction="horizontal"
        align={
          // this is needed to control the wrapping of multiple buttons
          theme?.block?.align === "center"
            ? "center"
            : theme?.block?.align === "right"
            ? "right"
            : "left"
        }
      />
    </div>
  );
};
