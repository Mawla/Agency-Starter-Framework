import { backgroundClasses } from "../../colors";
import { Lozenge } from "../../components/Decorations/Lozenge";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroup } from "../../components/buttons/ButtonGroup";
import PortableText from "../../components/content/PortableText";
import { ResponsiveImage } from "../../components/images/ResponsiveImage";
import { Bleed } from "../../components/module/Bleed";
import { Text } from "../../components/module/Text";
import { Title } from "../../components/module/Title";
import { Width } from "../../components/module/Width";
// import { useWindowSize, WindowSize } from "../../hooks/useWindowSize";
import { ColorType, ImageType } from "../../types";
import cx from "classnames";
import React from "react";

export type HeroBasicProps = {
  eyebrow?: string;
  title?: string;
  buttons?: ButtonProps[];
  text?: React.ReactElement;
  visual?: {
    image1?: ImageType;
    image2?: ImageType;
    colors?: {
      color1?: ColorType;
      color2?: ColorType;
      color3?: ColorType;
      color4?: ColorType;
    };
  };
  showLozenges?: boolean;
  breakOutImage?: boolean;
  pullUp?: boolean;
};

export const HeroBasic = (data: HeroBasicProps) => {
  if (!data) return null;

  const {
    eyebrow,
    title,
    buttons,
    text,
    visual,
    showLozenges,
    breakOutImage,
    pullUp,
  }: HeroBasicProps = data;

  // const { width }: WindowSize = useWindowSize();
  const width = 1024;
  const MAX_MOBILE_SIZE = 900;

  const SHARED_LEG_CLASSES =
    "rounded-full absolute origin-[50%_100%] overflow-hidden transform";

  const GRADIENT_STYLES = {
    "action-base":
      "linear-gradient(-116.1deg, rgba(7, 165, 181, 1.0) 0%, rgba(6, 127, 150, 1.0) 100%)",
    "neutral-base":
      "linear-gradient(-116.1deg, rgba(89, 93, 106, 1.0) 0%, rgba(33, 40, 59, 1.0) 100%)",
    "brand-base":
      "linear-gradient(159.62deg, #913DDB 4.48%, #8028C9 40.27%, #761CBE 67.1%, #7318BB 93.94%)",
  };

  const LEG_STYLES: Record<
    "first" | "second" | "third" | "fourth",
    {
      bottom: number;
      left: number;
      width: number;
      height: number;
      rotation: number;
      zIndex: number;
      background?: string;
    }
  > = {
    first: {
      bottom: 585,
      left: 330,
      width: 200,
      height: 665,
      rotation: -28.7,
      zIndex: 10,
    },
    second: {
      bottom: 650,
      left: 185,
      width: 200,
      height: 555,
      rotation: 180 - 101,
      zIndex: 30,
    },
    third: {
      bottom: 10,
      left: 440,
      width: 200,
      height: 850,
      rotation: 14.6,
      zIndex: 20,
    },
    fourth: {
      bottom: 50,
      left: 385,
      width: 200,
      height: 1080,
      rotation: 180 - 125.16,
      zIndex: 10,
    },
  };

  if (visual?.colors?.color2)
    LEG_STYLES.second.background =
      GRADIENT_STYLES[visual?.colors?.color2 as keyof typeof GRADIENT_STYLES];
  if (visual?.colors?.color4)
    LEG_STYLES.fourth.background =
      GRADIENT_STYLES[visual?.colors?.color4 as keyof typeof GRADIENT_STYLES];

  let mobileColor1 = visual?.colors?.color1;

  if (width && width < MAX_MOBILE_SIZE) {
    LEG_STYLES.first.rotation = -43;
    LEG_STYLES.first.bottom += 20;
    LEG_STYLES.first.height += 200;

    if (width < MAX_MOBILE_SIZE && visual?.colors?.color1) {
      mobileColor1 = visual?.colors?.color1.replace(
        /dark|base/,
        "light",
      ) as ColorType;
    }
  }

  return (
    <header
      className={cx("relative z-0 overflow-hidden text-neutral-base", {
        ["mb-[-140px] md:mb-[-100px] xl:mb-[-100px]"]: pullUp,
      })}
    >
      {showLozenges && (
        <span
          className={cx(
            "absolute",
            "tablet:hidden",
            "right-0 top-0 translate-x-1/2",
          )}
        >
          <Lozenge size="xl" color="brand-light" rotation={8} />
        </span>
      )}
      <div
        className={cx(
          "relative flex flex-row items-center z-30",
          "tablet:min-h-[545px]",
          // 'lg:min-h-[818px] xl:min-h-[980px] 2xl:min-h-[1090px]',
          "-mb-[140px] tablet:-mb-0", // pull visual up on mobile
          "pt-[90px]",
          "tablet:pb-[140px] xl:pb-[280px]",
          {
            ["tablet:pt-[120px] 2xl:pt-[260px]"]: !showLozenges,
            ["tablet:pt-[200px] 2xl:pt-[360px]"]: showLozenges,
          },
        )}
      >
        <Bleed bleed="md">
          <Width width="inner">
            <div className="relative flex flex-col tablet:max-w-[75%] lg:max-w-[790px] gap-4">
              {showLozenges && (
                <span
                  className={cx(
                    "absolute",
                    "hidden tablet:block",
                    "left-0 top-0 ",
                    "tablet:-translate-y-[80%] lg:-translate-y-[85%] xl:-translate-y-full -translate-x-1/2",
                  )}
                >
                  <Lozenge size="xl" color="neutral-95" rotation={2} />
                </span>
              )}

              {(title || eyebrow) && (
                <Title as="h1" size="4xl" color="neutral-10" eyebrow={eyebrow}>
                  {title}
                </Title>
              )}

              {text && (
                <Text size="2xl" className="mt-2" color="neutral-25">
                  <PortableText content={text as any} />
                </Text>
              )}

              {buttons && (
                <ButtonGroup className="mt-4 md:mt-6 lg:mt-8" items={buttons} />
              )}
            </div>
          </Width>
        </Bleed>
      </div>

      {/* visual */}
      <div
        className={cx(
          "overflow-hidden z-10 pointer-events-none",
          "tablet:absolute tablet:top-0 tablet:right-0 tablet:bottom-0 tablet:left-[45%]",
          "h-[520px] tablet:h-auto",
        )}
      >
        <div
          className={cx(
            "absolute inset-0",
            "origin-bottom-left",
            "-translate-x-[75px] tablet:translate-x-[100px] xl:translate-x-0",
            "scale-[40%] tablet:scale-[60%] lg:scale-75 xl:scale-90 2xl:scale-100",
          )}
        >
          {/* 1 */}
          <div
            className={cx(
              SHARED_LEG_CLASSES,
              visual?.colors?.color1 &&
                `tablet:${backgroundClasses[visual?.colors?.color1]}`,
              mobileColor1 && backgroundClasses[mobileColor1],
            )}
            style={{
              ...LEG_STYLES.first,
              transform: `rotate(${LEG_STYLES.first.rotation}deg)`,
            }}
          >
            {visual?.image2 && (
              <div
                className="absolute -left-[35%] -right-[30%] top-[300px] bottom-0 tablet:-left-[58%] tablet:-right-1/3 tablet:top-[13px] tablet:bottom-[50px]"
                style={{
                  transform: `rotate(${LEG_STYLES.first.rotation * -1}deg)`,
                }}
              >
                <ResponsiveImage
                  {...visual.image2}
                  fill
                  className="absolute inset-0"
                  priority
                  loading="eager"
                />
              </div>
            )}
          </div>

          {/* 2 */}
          <div
            className={cx(
              SHARED_LEG_CLASSES,
              visual?.colors?.color2 &&
                backgroundClasses[visual?.colors?.color2],
            )}
            style={{
              ...LEG_STYLES.second,
              transform: `rotate(${LEG_STYLES.second.rotation}deg)`,
            }}
          ></div>

          {/* 3 */}
          <div
            className={cx(
              SHARED_LEG_CLASSES,
              visual?.colors?.color3 &&
                backgroundClasses[visual?.colors?.color3],
              {
                ["overflow-visible"]: breakOutImage,
              },
            )}
            style={{
              ...LEG_STYLES.third,
              transform: `rotate(${LEG_STYLES.third.rotation}deg)`,
            }}
          >
            {visual?.image1 && (
              <div
                className={cx("absolute bottom-0", {
                  ["top-[130px] -left-1/3 -right-1/2"]: !breakOutImage,
                  ["top-1/4 aspect-square -right-[32.5%] z-20"]: breakOutImage,
                })}
                style={{
                  transform: `rotate(${LEG_STYLES.third.rotation * -1}deg)`,
                  translate: breakOutImage ? "0 6%" : "0",
                  clipPath: breakOutImage
                    ? `path("M 0 630 V 10 H 675 V 232 L 590 292 L 524 546 C 505 621.5 458 630 398 630 H 0 Z")`
                    : "none",
                }}
              >
                <ResponsiveImage
                  {...visual.image1}
                  fill
                  className="absolute inset-0 opacity-100"
                  priority
                  loading="eager"
                />
              </div>
            )}
            {breakOutImage && showLozenges && (
              <span
                className={cx(
                  "absolute z-10",
                  "lg:left-[85%] lg:bottom-[65%]",
                  "hidden lg:block",
                )}
              >
                <Lozenge size="sm" color="neutral-base" rotation={10} />
              </span>
            )}
          </div>

          {/* 4 */}
          <div
            className={cx(
              SHARED_LEG_CLASSES,
              visual?.colors?.color4 &&
                backgroundClasses[visual?.colors?.color4],
            )}
            style={{
              ...LEG_STYLES.fourth,
              transform: `rotate(${LEG_STYLES.fourth.rotation}deg)`,
            }}
          ></div>
        </div>
      </div>

      {/* lozenges */}
      {showLozenges && (
        <div
          className={cx("absolute inset-0 pointer-events-none", {
            ["z-20"]: !breakOutImage,
          })}
        >
          {!breakOutImage && (
            <span
              className={cx(
                "absolute",
                "2xl:left-[calc(45%+760px)] 2xl:bottom-[500px]",
                "xl:left-[calc(45%+690px)] xl:bottom-[440px]",
                "lg:left-[calc(45%+680px)] lg:bottom-[350px]",
                "hidden lg:block",
              )}
            >
              <Lozenge size="sm" color="neutral-base" rotation={10} />
            </span>
          )}
          <span
            className={cx(
              "absolute",
              "2xl:left-[calc(45%+340px)] 2xl:bottom-[240px]",
              "xl:left-[calc(45%+260px)] xl:bottom-[180px]",
              "lg:left-[calc(45%+290px)] lg:bottom-[80px]",
              "tablet:left-[calc(45%+260px)] tablet:bottom-[40px]",
              "hidden tablet:block",
            )}
          >
            <Lozenge size="md" color="action-light" rotation={10} />
          </span>

          <span
            className={cx(
              "absolute",
              "tablet:hidden",
              "right-[50px] bottom-[270px]",
            )}
          >
            <Lozenge size="md" color="neutral-95" rotation={4} />
          </span>
        </div>
      )}
    </header>
  );
};

export default React.memo(HeroBasic);
