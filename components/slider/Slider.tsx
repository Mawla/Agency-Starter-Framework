import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { textClasses } from "../../theme";
import { IconLoader } from "../images/IconLoader";
import { SliderColorType } from "./slider.options";
import cx from "clsx";
import { CSSProperties, useContext, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Keyboard, Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export type SliderProps = {
  slides?: (React.ReactElement | null)[];
  columns?: number | "auto";
  gap?: number;
  controlsColor?: SliderColorType;
  slideStyle?: CSSProperties;
  className?: string;
  slideClassName?: string;
  effect?: "fade" | "slide";
};

export const Slider = ({
  slides,
  columns,
  gap = 0,
  controlsColor,
  slideStyle,
  className,
  slideClassName,
  effect,
}: SliderProps) => {
  const { config } = useContext(SiteContext);
  const { language } = useContext(PageContext);

  const translations = config.translations;

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  if (!slides?.filter(Boolean).length) return null;

  return (
    <div className={cx("relative", className)}>
      {/* Adding the slidesPerGroup property breaks dragging behavior, removing it for now. */}
      <Swiper
        spaceBetween={gap}
        slidesPerView={columns}
        grabCursor={!slides?.some((slide) => slide?.props?.href)}
        modules={[Keyboard, Navigation, EffectFade]}
        effect={effect === "fade" ? "fade" : undefined}
        simulateTouch={true}
        navigation={{ prevEl, nextEl }}
        keyboard={{
          enabled: true,
        }}
        fadeEffect={{ crossFade: true }}
      >
        {slides?.filter(Boolean).map((slide, n) => (
          <SwiperSlide
            className={cx("self-stretch", slideClassName)}
            style={slideStyle}
            key={n}
          >
            <div
              className={cx("h-full select-none", {
                ["swiper-no-swiping"]: slide?.props.href,
              })}
            >
              {slide}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="inline-flex justify-end gap-3">
        {["prev", "next"].map((direction) => (
          <button
            key={direction}
            type="button"
            className={cx(
              "relative flex items-center justify-center transition-opacity disabled:opacity-20",
              controlsColor && textClasses[controlsColor as SliderColorType],
            )}
            ref={(node) =>
              direction === "prev" ? setPrevEl(node) : setNextEl(node)
            }
          >
            <span className="sr-only">
              {direction === "prev"
                ? translations?.next_slide?.[language] || "next"
                : translations?.previous_slide?.[language] || "previous"}
            </span>
            <IconLoader
              icon="chevrondown"
              className={cx("w-6 h-6", {
                ["rotate-90"]: direction === "prev",
                ["-rotate-90"]: direction === "next",
              })}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
