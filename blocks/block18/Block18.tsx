import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { ComposableCardProps } from "../../components/cards/ComposableCard";
import { ImageCardProps } from "../../components/cards/ImageCard";
import { TestimonialCardProps } from "../../components/cards/TestimonialCard";
import { DecorationProps } from "../../components/decorations/Decoration";
import { FancyboxProps } from "../../components/lightbox/Fancybox";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { SliderProps } from "../../components/slider/Slider";
import { SliderColorType } from "../../components/slider/slider.options";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { shouldRenderPortableText } from "../../helpers/utils/portabletext";
import {
  BREAKPOINTS,
  BreakpointType,
  useBreakpoint,
} from "../../hooks/useBreakpoint";
import { useDebounce } from "../../hooks/useDebounce";
import ErrorBoundary from "../../layout/pagebuilder/ErrorBoundary";
import { justifyClasses } from "../../theme";
import {
  colSpanClasses,
  gapHorizontalClasses,
  gapVerticalClasses,
  gridClasses,
} from "./block18.classes";
import { ColumnType, GapType } from "./block18.options";
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

const ImageCard = lazy<ComponentType<ImageCardProps>>(
  () =>
    import(
      /* webpackChunkName: "ImageCard" */ "../../components/cards/ImageCard"
    ),
);

const Fancybox = lazy<ComponentType<FancyboxProps>>(
  () =>
    import(
      /* webpackChunkName: "Fancybox" */ "../../components/lightbox/Fancybox"
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
  items?: (ComposableCardProps | TestimonialCardProps | ImageCardProps)[];
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
  const debouncedScreenWidth = useDebounce(screenWidth, 250);

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridStyle, setGridStyle] = useState<CSSProperties>();

  const filteredItems = items?.filter(Boolean);
  const numItems = filteredItems?.length || 0;
  let numColumns = theme?.grid?.columns || 2;

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
    title?.length ||
    shouldRenderPortableText(intro) ||
    Boolean(buttons?.length);

  const GridWrapper = filteredItems?.find(({ type }) => type === "card.image")
    ? Fancybox
    : "div";

  /**
   * Calculate centering of grid items
   */

  useEffect(() => {
    if (!gridRef.current) return;

    const gaps = window
      .getComputedStyle(gridRef.current, null)
      .getPropertyValue("gap");

    let gapSize: number;
    if (gaps.indexOf(" ") > -1) {
      gapSize = +gaps.split(" ")[1]?.replace("px", "");
    } else {
      gapSize = +gaps.replace("px", "");
    }

    const numColumns = window
      .getComputedStyle(gridRef.current, null)
      .getPropertyValue("grid-template-columns")
      .split(" ").length;

    const gridRect = gridRef.current.getBoundingClientRect();
    const gridWidth = gridRect.width;

    // group items by row
    const children = gridRef.current.children;
    const rows = Array.from(children).reduce((prev, curr) => {
      const top = curr.getBoundingClientRect().top;
      if (!prev[top]) prev[top] = [];
      prev[top].push(curr as HTMLDivElement);
      return prev;
    }, {} as Record<number, HTMLDivElement[]>);

    // find orphans and push if needed
    Object.entries(rows).forEach(([y, items]) => {
      let shiftX = 0;
      // only move items in rows that aren't full
      if (items.length < numColumns) {
        if (
          theme?.block?.align == "center" ||
          theme?.block?.align === "right"
        ) {
          const accumulatedChildrenWidth = items.reduce((prev, curr) => {
            const childRect = curr.getBoundingClientRect();
            const childWidth = childRect.width;
            return prev + childWidth + gapSize;
          }, -gapSize);

          shiftX = gridWidth - accumulatedChildrenWidth;
          if (theme?.block?.align === "center") shiftX /= 2;
        }
      }

      items.forEach((item, i) => {
        if (shiftX) {
          item.style.transform = `translateX(${shiftX}px)`;
        } else {
          item.style.removeProperty("transform");
        }

        // store column index on each item for animation delay
        item.firstElementChild?.setAttribute("data-column", i.toString());
      });
    });
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
          "flex flex-col gap-6 max-w-4xl",
          theme?.block?.align && textAlignClasses[theme?.block?.align],
        )}
      >
        {title && (
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
            {title}
          </Title>
        )}

        {shouldRenderPortableText(intro) && (
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
        <GridWrapper
          className={cx(
            "block",
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
                (
                  item:
                    | ComposableCardProps
                    | TestimonialCardProps
                    | ImageCardProps,
                  i: number,
                ) => {
                  if (item.type === "card.composable") {
                    item.blockTitleLevel = theme?.title?.as || "h2";
                  }
                  return (
                    <div
                      key={item._key}
                      className="card h-full text-left"
                      data-animate="zoom-in"
                    >
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
                "grid",
                theme?.grid?.columns && gridClasses[numColumns],
                theme?.grid?.gapHorizontal &&
                  gapHorizontalClasses[theme?.grid?.gapHorizontal],
                theme?.grid?.gapVertical &&
                  gapVerticalClasses[theme?.grid?.gapVertical],
              )}
              ref={gridRef}
              style={gridStyle}
            >
              {filteredItems?.map(
                (
                  item:
                    | ComposableCardProps
                    | TestimonialCardProps
                    | ImageCardProps,
                  i: number,
                ) => {
                  if (item.type === "card.composable") {
                    item.blockTitleLevel = theme?.title?.as || "h2";
                  }

                  return (
                    <div
                      key={item._key}
                      className={cx(
                        "h-full text-left",
                        item?.theme?.card?.columns &&
                          colSpanClasses[item?.theme?.card?.columns],
                      )}
                    >
                      <div
                        className="card h-full"
                        data-animate="zoom-in"
                        data-animate-threshold=".25"
                        data-duration="500"
                      >
                        <CardWrapper>
                          <Card {...item} />
                        </CardWrapper>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          )}
        </GridWrapper>
      )}

      {footer && (
        <div
          className={cx(
            "flex flex-col gap-6 max-w-4xl mt-10",
            theme?.block?.align && textAlignClasses[theme?.block?.align],
          )}
        >
          {shouldRenderPortableText(footer) && (
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

const Card = (
  item: ComposableCardProps | TestimonialCardProps | ImageCardProps,
) => {
  if (!item.type) return null;

  switch (item.type) {
    case "card.composable":
      return <ComposableCard {...item} key={item._key} />;
    case "card.testimonial":
      return <TestimonialCard {...item} key={item._key} />;
    case "card.image":
      return <ImageCard {...item} key={item._key} />;
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
