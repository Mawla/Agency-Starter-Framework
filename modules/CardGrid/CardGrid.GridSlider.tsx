import { SliderProps } from "../../components/slider/Slider";
import {
  BREAKPOINTS,
  BreakpointType,
  useBreakpoint,
} from "../../hooks/useBreakpoint";
import ErrorBoundary from "../../layout/modulebuilder/ErrorBoundary";
import { CardGridProps } from "./CardGrid";
import { ComposableCardProps } from "./ComposableCard";
import { ImageCardProps } from "./ImageCard";
import { ColumnType, GapType } from "./cardgrid.options";
import cx from "classnames";
import React, { ComponentType, CSSProperties, lazy } from "react";

const Slider = lazy<ComponentType<SliderProps>>(
  () =>
    import(/* webpackChunkName: "Slider" */ "../../components/slider/Slider"),
);

const ComposableCard = lazy<ComponentType<ComposableCardProps>>(
  () => import(/* webpackChunkName: "ComposableCard" */ "./ComposableCard"),
);

const ImageCard = lazy<ComponentType<ImageCardProps>>(
  () => import(/* webpackChunkName: "ImageCard" */ "./ImageCard"),
);

type CardGridGridSliderProps = {
  items?: CardGridProps["items"];
  theme?: CardGridProps["theme"];
};

const gridClasses: Record<ColumnType, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
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

export const CardGridGridSlider = ({
  items,
  theme,
}: CardGridGridSliderProps) => {
  const { screenWidth, breakpoint } = useBreakpoint();

  if (!items) return null;

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
  if (items?.length > slideColumns) {
    slideColumns = +slideColumns + (screenWidth > BREAKPOINTS.md ? 0.25 : 0.5);
  }

  // slider on mobile by default, adjustable by theme
  let slider = false;
  if (screenWidth < BREAKPOINTS.lg && theme?.slider?.mobile !== false)
    slider = true;
  if (screenWidth > BREAKPOINTS.lg && theme?.slider?.desktop === true)
    slider = true;

  if (theme?.grid?.columns && +theme?.grid?.columns === 1)
    theme.grid.stagger = false;

  // read the gap size from the tailwind classes to make grid gaps stay in sync between slider and grid layouts
  const sliderGapSize: number = getSliderGapSize(
    breakpoint,
    theme?.grid?.gapHorizontal || "xs",
  );

  if (slider) {
    return (
      <React.Suspense>
        <Slider
          gap={sliderGapSize}
          columns={slideColumns}
          slides={items?.map((item) => {
            if (item?.type === "card.composable")
              return (
                <CardWrapper>
                  <ComposableCard {...item} key={item._key} />
                </CardWrapper>
              );
            if (item?.type === "card.image")
              return (
                <CardWrapper>
                  <ImageCard {...item} key={item._key} />
                </CardWrapper>
              );
            return null;
          })}
          controlsColor={theme?.slider?.color}
        />
      </React.Suspense>
    );
  }

  return (
    <div
      className={cx(
        "grid",
        gridClasses[theme?.grid?.columns || 2],
        gapHorizontalClasses[theme?.grid?.gapHorizontal || "xs"],
        gapVerticalClasses[theme?.grid?.gapVertical || "xs"],
        {
          ["pb-20"]: theme?.grid?.stagger,
        },
      )}
    >
      {items?.map((item, i) => {
        const staggerStyle: CSSProperties = theme?.grid?.stagger
          ? {
              transform: `translateY(${
                80 + (i % (Math.floor(slideColumns) || 2)) * -80
              }px)`,
            }
          : {};

        return (
          <div key={item._key} className="h-full" style={staggerStyle}>
            <CardWrapper>
              {item?.type === "card.composable" && <ComposableCard {...item} />}
              {item?.type === "card.image" && <ImageCard {...item} />}
            </CardWrapper>
          </div>
        );
      })}
    </div>
  );
};

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
      if (!breakpoint) return acc;
      const gap = +(curr.match(/\d+$/) as any)[0] * 4;
      return { ...acc, [breakpoint]: gap };
    }, {} as Record<BreakpointType, number>);
  return sliderGapSizes[breakpoint];
};
