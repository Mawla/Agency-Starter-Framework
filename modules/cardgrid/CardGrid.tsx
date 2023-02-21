import cx from 'classnames';
import React, { ComponentType, CSSProperties, lazy } from 'react';

import { SliderColorType } from '../../components/slider/slider.options';
import { ButtonProps } from '../../components/buttons/Button';
import {  ButtonGroupProps } from '../../components/buttons/ButtonGroup';
import {
  ModuleRadiusType,
  ModuleRoundedType,
} from '../../components/module/background.options';
import { SpaceType } from '../../components/module/spacing.options';
import { AlignType, TextProps } from '../../components/module/Text';
import { TitleProps } from '../../components/module/Title';
import {  WrapperProps } from '../../components/module/Wrapper';
import {
  BREAKPOINTS,
  BreakpointType,
  useBreakpoint,
} from '../../hooks/useBreakpoint';
import ErrorBoundary from '../../layout/pagebuilder/ErrorBoundary';
import {
  BackgroundColorType,
  ButtonPositionType,
  ColumnType,
  GapType,
  TitleSizeType,
} from './cardgrid.options';
import { type ComposableCardProps } from './ComposableCard';
import { ImageCardProps } from './ImageCard';
import { ColorType, HeadingLevelType } from '../../types';
import  { PortableTextProps } from '../../components/portabletext/PortableText';
import { SliderProps } from '../../components/slider/Slider';

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ '../../components/module/Title') 
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ '../../components/module/Text') 
);

const ComposableCard = lazy<ComponentType<ComposableCardProps>>(
  () => import(/* webpackChunkName: "ComposableCard" */ './ComposableCard') ,
);

const ImageCard = lazy<ComponentType<ImageCardProps>>(
  () => import(/* webpackChunkName: "ImageCard" */ './ImageCard') ,
);


const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
);

const Slider = lazy<ComponentType<SliderProps>>(
  () =>
    import(/* webpackChunkName: "Slider" */ "../../components/slider/Slider"),
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

export type CardGridCardProps = {
  _key?: string;
};

export type CardGridProps = {
  eyebrow?: string;
  title?: string;
  intro?: React.ReactNode;
  items?: ((ComposableCardProps | ImageCardProps) & { _key?: string })[];
  buttons?: ButtonProps[];
  theme?: {
    module?: {
      space?: SpaceType;
      background?: BackgroundColorType;
      align?: AlignType;
      rounded?: ModuleRoundedType;
    };
    grid?: {
      columns?: ColumnType;
      gapHorizontal?: GapType;
      gapVertical?: GapType;
      stagger?: boolean;
    };
    eyebrow?: {
      color?: ColorType
    };
    title?: {
      size?: TitleSizeType;
      color?: ColorType;
      level?: HeadingLevelType
    };
    text?: {
      color?: ColorType
    };
    buttons?: {
      position?: ButtonPositionType;
    };
    slider?: {
      mobile?: boolean;
      desktop?: boolean;
      color?: SliderColorType;
    };
    decorations?: {
      roundedTop?: ModuleRadiusType;
      roundedBottom?: ModuleRadiusType;
    };
  };
};

const gridClasses: Record<ColumnType, string> = {
  1: 'grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
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
  1: '',
  2: `md:[&>*:last-child:nth-child(2n-1)]:translate-x-1/2`,
  3: `md:max-lg:[&>*:last-child:nth-child(2n-1)]:translate-x-1/2 
    lg:[&>*:last-child:nth-child(2n-1)]:translate-x-none
    lg:[&>*:last-child:nth-child(3n-1)]:col-start-3 
    lg:[&>*:last-child:nth-child(3n-1)]:-translate-x-1/2 
    lg:[&>*:nth-last-child(2):nth-child(3n+1)]:col-start-2 
    lg:[&>*:nth-last-child(2):nth-child(3n+1)]:-translate-x-1/2 
    lg:[&>*:last-child:nth-child(3n-2)]:col-start-2`.replace(/\n/g, ''),
  4: `md:max-lg:[&>*:last-child:nth-child(2n-1)]:translate-x-1/2 
    lg:[&>*:last-child:nth-child(4n-1)]:translate-x-1/2 
    lg:[&>*:nth-last-child(2):nth-child(4n+2)]:translate-x-1/2 
    lg:[&>*:nth-last-child(3):nth-child(4n+1)]:translate-x-1/2
    lg:[&>*:nth-last-child(2):nth-child(4n+1)]:col-start-2
    lg:[&>*:nth-last-child(1):nth-child(4n+1)]:col-start-3 
    lg:[&>*:nth-last-child(1):nth-child(4n+1)]:-translate-x-1/2
  `.replace(/\n/g, ''),
};

// need all breakpoints defined in these classes to calculate the slider gap
const gapHorizontalClasses: Record<GapType, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-6 xl:gap-x-6 2xl:gap-x-6',
  sm: 'gap-x-4 sm:gap-x-4 md:gap-x-4 lg:gap-x-8 xl:gap-x-8 2xl:gap-x-8',
  md: 'gap-x-5 sm:gap-x-5 md:gap-x-6 lg:gap-x-10 xl:gap-x-10 2xl:gap-x-10',
  lg: 'gap-x-6 sm:gap-x-6 md:gap-x-10 lg:gap-x-16 xl:gap-x-20 2xl:gap-x-22',
  xl: 'gap-x-10 sm:gap-x-10 md:gap-x-20 lg:gap-x-24 xl:gap-x-32 2xl:gap-x-40',
};

const gapVerticalClasses: Record<GapType, string> = {
  none: 'gap-y-0',
  xs: 'gap-y-3 sm:gap-y-4 md:gap-y-6 lg:gap-y-6 xl:gap-y-6 2xl:gap-y-6',
  sm: 'gap-y-4 sm:gap-y-4 md:gap-y-4 lg:gap-y-8 xl:gap-y-8 2xl:gap-y-8',
  md: 'gap-y-5 sm:gap-y-5 md:gap-y-6 lg:gap-y-10 xl:gap-y-10 2xl:gap-y-10',
  lg: 'gap-y-8 sm:gap-y-8 md:gap-y-10 lg:gap-y-16 xl:gap-y-20 2xl:gap-y-24',
  xl: 'gap-y-10 sm:gap-y-10 md:gap-y-20 lg:gap-y-24 xl:gap-y-32 2xl:gap-y-40',
};

export const CardGrid = ({
  eyebrow,
  title,
  intro,
  items,
  buttons,
  theme,
}: CardGridProps) => {
  const { screenWidth, breakpoint } = useBreakpoint();

  if (!theme) theme = {};
  if (!theme.grid) theme.grid = {};

  let slideColumns = 1;
  if (screenWidth > BREAKPOINTS.xs) slideColumns = 1;
  if (screenWidth > BREAKPOINTS.sm) slideColumns = 2;
  if (screenWidth > BREAKPOINTS.md)
    slideColumns = theme?.grid?.columns && theme?.grid?.columns < 3 ? theme?.grid?.columns : 3;
  if (screenWidth > BREAKPOINTS.lg) slideColumns = theme?.grid?.columns || 3;

  // show half of an extra slide if needed
  if (items?.length && items?.length > slideColumns) {
    slideColumns = +slideColumns + (screenWidth > BREAKPOINTS.md ? 0.25 : 0.5);
  }

  // slider on mobile by default, adjustable by theme
  let slider = false;
  if (screenWidth < BREAKPOINTS.lg && theme?.slider?.mobile !== false) slider = true;
  if (screenWidth > BREAKPOINTS.lg && theme?.slider?.desktop === true) slider = true;

  if (theme?.grid?.columns && +theme?.grid?.columns === 1) theme.grid.stagger = false;


  // read the gap size from the tailwind classes to make grid gaps stay in sync between slider and grid layouts
  const sliderGapSize: number = getSliderGapSize(
    breakpoint,
    theme?.grid?.gapHorizontal || 'xs',
  );

  const hasContentBeforeGrid =
    title ||
    intro ||
    (Boolean(buttons?.length) && theme?.buttons?.position !== 'after');

  return (
    <div className="overflow-hidden relative">
      <Wrapper
        id={title}
        theme={{
          background: theme?.module?.background,
          space: theme?.module?.space,
          rounded: {
            top: theme?.decorations?.roundedTop,
            bottom: theme?.decorations?.roundedBottom,
          },
        }}
        innerClassName="overflow-hidden"
      >


        <div
          className={cx('z-20 relative', {
            ['py-8 sm:py-10 lg:py-16 xl:py-30']: theme?.module?.background,
          })}
        >
          <div
            className={cx('max-w-title flex flex-col gap-8', {
              ['md:text-left']: theme?.module?.align === 'left',
              ['md:text-center md:mx-auto']: theme?.module?.align === 'center',
              ['md:text-right md:ml-auto']: theme?.module?.align === 'right',
            })}
          >
            {(Boolean(title?.trim().length) || Boolean(eyebrow?.trim().length)) && (
              <Title
                size={theme?.title?.size || '3xl'}
                eyebrow={eyebrow}
                color={theme?.title?.color}
                eyebrowColor={theme?.eyebrow?.color}
                as={theme?.title?.level}
              >
                {title}
              </Title>
            )}
            {intro && (
              <Text
                size="lg"
                color={theme?.text?.color}
                as="div"
                align={
                  screenWidth < BREAKPOINTS.md
                    ? 'left'
                    : theme?.module?.align === 'center'
                    ? 'center'
                    : theme?.module?.align === 'right'
                    ? 'right'
                    : 'left'
                }
              >
                <PortableText content={intro as any} />
              </Text>
            )}

            {buttons && theme?.buttons?.position !== 'after' && (
              <CardGridButtons buttons={buttons} theme={theme} />
            )}
          </div>

          {Boolean(items?.length) && (
            <div
              className={cx('text-left', {
                ['mt-10 sm:mt-12 md:mt-16 xl:mt-20']: hasContentBeforeGrid,
              })}
            >
              {slider ? (
                <Slider
                  gap={sliderGapSize}
                  columns={slideColumns}
                  slides={items?.map((item) => {
                    if (item?.type === 'card.composable')
                      return (
                        <CardWrapper>
                          <ComposableCard {...item} key={item._key} />
                        </CardWrapper>
                      );
                    if (item?.type === 'card.image')
                      return (
                        <CardWrapper>
                          <ImageCard {...item} key={item._key} />
                        </CardWrapper>
                      );
                      return null
                  })}
                  controlsColor={theme?.slider?.color}
                />
              ) : (
                <div
                  className={cx(
                    'grid',
                    gridClasses[theme?.grid?.columns || 2],
                    gapHorizontalClasses[theme?.grid?.gapHorizontal || 'xs'],
                    gapVerticalClasses[theme?.grid?.gapVertical || 'xs'],
                    {
                      ['pb-20']: theme?.grid?.stagger,
                      [gridCenterClasses[theme?.grid?.columns || 2]]:
                        theme?.module?.align === 'center',
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
                          {item?.type === 'card.composable' && (
                            <ComposableCard {...item} />
                          )}
                          {item?.type === 'card.image' && (
                            <ImageCard
                              {...item}
                  
                            />
                          )}
                        </CardWrapper>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {buttons && theme?.buttons?.position === 'after' && (
            <div
              className={cx({
                ['mt-10 md:mt-12 lg:mt-16 xl:mt-20']: !slider || !items?.length,
              })}
            >
              <CardGridButtons buttons={buttons} theme={theme} />
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default React.memo(CardGrid);

type CardGridButtonsProps = {
  buttons?: CardGridProps['buttons'];
  theme?: CardGridProps['theme'];
};

const CardGridButtons = ({ buttons, theme }: CardGridButtonsProps) => {
  const { screenWidth } = useBreakpoint();
  if (!buttons) return null;

  return (
    <div
      className={cx('flex', {
        ['md:justify-start']: theme?.module?.align === 'left',
        ['md:justify-center']: theme?.module?.align === 'center',
        ['md:justify-end']: theme?.module?.align === 'right',
      })}
    >
      <ButtonGroup
        items={buttons}
        stretch={false}
        direction="horizontal"
        align={
          // this is needed to control the wrapping of multiple buttons
          screenWidth < BREAKPOINTS.md
            ? 'left'
            : theme?.module?.align === 'center'
            ? 'center'
            : theme?.module?.align === 'right'
            ? 'right'
            : 'left'
        }
      />
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
    .split(' ')
    .reduce((acc, curr) => {
      const breakpoint = (curr.match(/(.*):/)?.[1] || 'xs') as BreakpointType;
      const gap = +curr.match(/\d+$/)![0] * 4;
      return { ...acc, [breakpoint]: gap };
    }, {} as Record<BreakpointType, number>);
  return sliderGapSizes[breakpoint];
};
