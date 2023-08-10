import { DecorationProps } from "../../components/block/Decoration";
import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
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
import { ComposableCard, ComposableCardProps } from "./ComposableCard";
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

const gridClasses: Record<ColumnType, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

// css grid doesn't have centering abilities for left over
// child items. Using nth child selectors and translates combined
// with col-start we can achieve that effect.
//
// created a tailwind pen https://play.tailwindcss.com/f9vDSGiuvA
// see GridCenterCards in Storybook for a test case
//
// There's no need to center below medium breakpoint because the other
// module items (title, intro etc) are left aligned on mobile.
const gridCenterClasses: Record<ColumnType, string> = {
  1: "",
  2: `md:[&>*:last-child:nth-child(2n-1)]:translate-x-1/2`,
  3: `md:max-lg:[&>*:last-child:nth-child(2n-1)]:translate-x-1/2
    lg:[&>*:last-child:nth-child(2n-1)]:translate-x-none
    lg:[&>*:last-child:nth-child(3n-1)]:col-start-3
    lg:[&>*:last-child:nth-child(3n-1)]:-translate-x-1/2
    lg:[&>*:nth-last-child(2):nth-child(3n+1)]:col-start-2
    lg:[&>*:nth-last-child(2):nth-child(3n+1)]:-translate-x-1/2
    lg:[&>*:last-child:nth-child(3n-2)]:col-start-2`.replace(/\n/g, ""),
  4: `md:max-lg:[&>*:last-child:nth-child(2n-1)]:translate-x-1/2
    lg:[&>*:last-child:nth-child(4n-1)]:translate-x-1/2
    lg:[&>*:nth-last-child(2):nth-child(4n+2)]:translate-x-1/2
    lg:[&>*:nth-last-child(3):nth-child(4n+1)]:translate-x-1/2
    lg:[&>*:nth-last-child(2):nth-child(4n+1)]:col-start-2
    lg:[&>*:nth-last-child(1):nth-child(4n+1)]:col-start-3
    lg:[&>*:nth-last-child(1):nth-child(4n+1)]:-translate-x-1/2
  `.replace(/\n/g, ""),
};

// need all breakpoints defined in these classes to calculate the slider gap
const gapHorizontalClasses: Record<GapType, string> = {
  none: "gap-x-0",
  xs: "gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-6 xl:gap-x-6 2xl:gap-x-6",
  sm: "gap-x-4 sm:gap-x-4 md:gap-x-4 lg:gap-x-8 xl:gap-x-8 2xl:gap-x-8",
  md: "gap-x-5 sm:gap-x-5 md:gap-x-6 lg:gap-x-10 xl:gap-x-10 2xl:gap-x-10",
  lg: "gap-x-6 sm:gap-x-6 md:gap-x-10 lg:gap-x-16 xl:gap-x-20 2xl:gap-x-22",
  xl: "gap-x-10 sm:gap-x-10 md:gap-x-20 lg:gap-x-24 xl:gap-x-32 2xl:gap-x-40",
};

const gapVerticalClasses: Record<GapType, string> = {
  none: "gap-y-0",
  xs: "gap-y-3 sm:gap-y-4 md:gap-y-6 lg:gap-y-6 xl:gap-y-6 2xl:gap-y-6",
  sm: "gap-y-4 sm:gap-y-4 md:gap-y-4 lg:gap-y-8 xl:gap-y-8 2xl:gap-y-8",
  md: "gap-y-5 sm:gap-y-5 md:gap-y-6 lg:gap-y-10 xl:gap-y-10 2xl:gap-y-10",
  lg: "gap-y-8 sm:gap-y-8 md:gap-y-10 lg:gap-y-16 xl:gap-y-20 2xl:gap-y-24",
  xl: "gap-y-10 sm:gap-y-10 md:gap-y-20 lg:gap-y-24 xl:gap-y-32 2xl:gap-y-40",
};

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
          textAlignClasses[theme?.block?.align || "center"],
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
            align={theme?.block?.align || "center"}
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
                <CardWrapper>
                  <ComposableCard {...item} key={item._key} />
                </CardWrapper>
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
                  <div key={item._key} className="h-full">
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
        ["md:justify-start"]: theme?.block?.align === "left",
        ["md:justify-center"]: theme?.block?.align === "center",
        ["md:justify-end"]: theme?.block?.align === "right",
      })}
    >
      <ButtonGroup
        items={buttons}
        stretch={false}
        direction="horizontal"
        align={
          // this is needed to control the wrapping of multiple buttons
          screenWidth < BREAKPOINTS.md
            ? "left"
            : theme?.block?.align === "center"
            ? "center"
            : theme?.block?.align === "right"
            ? "right"
            : "left"
        }
      />
    </div>
  );
};
