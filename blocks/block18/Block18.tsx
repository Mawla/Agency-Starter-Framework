import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ComposableCardProps } from "../../components/cards/ComposableCard";
import { TestimonialCardProps } from "../../components/cards/TestimonialCard";
import { DecorationProps } from "../../components/decorations/Decoration";
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
import { useDebounce } from "../../hooks/useDebounce";
import { useSize } from "../../hooks/useSize";
import ErrorBoundary from "../../layout/pagebuilder/ErrorBoundary";
import { justifyClasses } from "../../theme";
import {
  colSpanClasses,
  gapHorizontalClasses,
  gapVerticalClasses,
  gridColClasses,
} from "./block18.classes";
import { ColumnType, GapType } from "./block18.options";
import cx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
import { PortableTextBlock } from "sanity";

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

const ComposableCard = lazy<ComponentType<ComposableCardProps>>(
  () =>
    import(
      /* webpackChunkName: "ComposableCard" */ "../../components/cards/ComposableCard"
    ),
);

const TestimonialCard = lazy<ComponentType<TestimonialCardProps>>(
  () =>
    import(
      /* webpackChunkName: "TestimonialCard" */ "../../components/cards/TestimonialCard"
    ),
);

export type Block18Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    footer?: TextThemeType;
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
  };
  decorations?: DecorationProps[];
  title?: string;
  intro?: React.ReactNode;
  footer?: React.ReactNode;
  buttons?: ButtonProps[];
  items?: (ComposableCardProps | TestimonialCardProps)[];
};

export const Block18 = ({
  theme,
  decorations,
  title,
  intro,
  footer,
  buttons,
  items,
}: Block18Props) => {
  const { screenWidth, breakpoint } = useBreakpoint();
  const debouncedScreenWidth = useDebounce(screenWidth, 500);

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridStyle, setGridStyle] = useState<CSSProperties>();

  const filteredItems = items?.filter(Boolean);
  const numItems = filteredItems?.length || 0;

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

  const hasContentBeforeGrid = title || intro || Boolean(buttons?.length);

  let numColumns = theme?.grid?.columns || 2;

  useEffect(() => {
    if (!gridRef.current) return;
    if (debouncedScreenWidth < BREAKPOINTS.sm) return;
    if (theme?.block?.align !== "center") return;

    const gapSize = +window
      .getComputedStyle(gridRef.current, null)
      .getPropertyValue("gap")
      .split(" ")[1]
      ?.replace("px", "");

    // const numChildren = gridRef.current.childElementCount;

    // const numColumns = window
    //   .getComputedStyle(gridRef.current, null)
    //   .getPropertyValue("grid-template-columns")
    //   .split(" ").length;

    const gridRect = gridRef.current.getBoundingClientRect();
    const gridWidth = gridRect.width;
    const gridY = gridRect.top;

    const children = gridRef.current.children;
    const accumulatedChildrenWidth = Array.from(children).reduce(
      (prev, curr) => {
        const childRect = curr.getBoundingClientRect();
        const childWidth = childRect.width;
        const childY = childRect.top;
        if (childY !== gridY) {
          return prev;
        }
        return prev + childWidth + gapSize;
      },
      -gapSize,
    );

    if (accumulatedChildrenWidth < gridWidth) {
      setGridStyle({
        transform: `translateX(${
          (gridWidth - accumulatedChildrenWidth) / 2
        }px)`,
      });
    } else {
      setGridStyle({
        transform: undefined,
      });
    }
  }, [debouncedScreenWidth, items, theme?.block?.align]);

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
            weight={theme?.intro?.weight}
            align={theme?.block?.align}
          >
            <PortableText content={intro as PortableTextBlock[]} />
          </Text>
        )}

        {/* buttons before */}
        {buttons && Boolean(buttons?.filter(Boolean).length) && (
          <div className="mt-6">
            <div
              className={cx(
                "flex",
                theme?.block?.align && justifyClasses[theme?.block?.align],
              )}
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
              slides={filteredItems?.map(
                (item: ComposableCardProps | TestimonialCardProps) => {
                  if (item.type === "card.composable") {
                    item.blockTitleLevel = theme?.title?.as || "h2";
                  }
                  return (
                    <div key={item._key} className="h-full text-left">
                      <CardWrapper>
                        <Card {...item} />
                      </CardWrapper>
                    </div>
                  );
                },
              )}
              controlsColor={theme?.slider?.color}
            />
          ) : (
            <div
              className={cx(
                "grid grid-cols-12",
                theme?.grid?.columns && gridColClasses[numColumns],
                theme?.grid?.gapHorizontal &&
                  gapHorizontalClasses[theme?.grid?.gapHorizontal],
                theme?.grid?.gapVertical &&
                  gapVerticalClasses[theme?.grid?.gapVertical],
              )}
              ref={gridRef}
              style={gridStyle}
            >
              {filteredItems?.map(
                (item: ComposableCardProps | TestimonialCardProps, i) => {
                  if (item.type === "card.composable") {
                    item.blockTitleLevel = theme?.title?.as || "h2";
                  }

                  return (
                    <div
                      key={item._key || i}
                      className={cx(
                        "h-full text-left",
                        // i == 1
                        //   ? colSpanClasses[2]
                        //   :
                        item?.theme?.card?.columns &&
                          colSpanClasses[item?.theme?.card?.columns],
                      )}
                    >
                      <CardWrapper>
                        <Card {...item} />
                      </CardWrapper>
                    </div>
                  );
                },
              )}
            </div>
          )}
        </div>
      )}

      {footer && (
        <div
          className={cx(
            "flex flex-col gap-6 max-w-3xl mt-10",
            theme?.block?.align && textAlignClasses[theme?.block?.align],
          )}
        >
          {footer && (
            <Text
              size={theme?.footer?.size || "xl"}
              color={theme?.footer?.color}
              weight={theme?.footer?.weight}
              align={theme?.block?.align}
            >
              <PortableText content={footer as PortableTextBlock[]} />
            </Text>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(Block18);

const Card = (item: ComposableCardProps | TestimonialCardProps) => {
  switch (item.type) {
    case "card.composable":
      return <ComposableCard {...item} key={item._key} />;
    case "card.testimonial":
      return <TestimonialCard {...item} key={item._key} />;
    // default:
    // return <ImageCard {...item} key={item._key} />;
  }
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
      const gap = +(curr as any).match(/\d+$/)[0] * 4;
      return { ...acc, [breakpoint]: gap };
    }, {} as Record<BreakpointType, number>);
  return sliderGapSizes[breakpoint];
};
