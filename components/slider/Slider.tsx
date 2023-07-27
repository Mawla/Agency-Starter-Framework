import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { borderClasses, textClasses } from "../../theme";
import { IconLoader } from "../images/IconLoader";
import { SliderColorType } from "./slider.options";
import cx from "classnames";
import { CSSProperties, useContext, useState } from "react";
import { Keyboard, Navigation } from "swiper";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

export type SliderProps = {
  slides?: (React.ReactElement | null)[];
  columns?: number | "auto";
  gap?: number;
  controlsColor?: SliderColorType;
  slideStyle?: CSSProperties;
  className?: string;
  slideClassName?: string;
};

export const Slider = ({
  slides,
  columns,
  gap = 0,
  controlsColor,
  slideStyle,
  className,
  slideClassName,
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
        modules={[Keyboard, Navigation]}
        simulateTouch={true}
        navigation={{ prevEl, nextEl }}
        keyboard={{
          enabled: true,
        }}
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

      <div className="flex justify-end gap-3">
        {["prev", "next"].map((direction) => (
          <button
            key={direction}
            type="button"
            className={cx(
              "border-2 rounded-full flex items-center justify-center w-10 h-10 transition-colors disabled:opacity-20",
              borderClasses[controlsColor || "black"],
              textClasses[(controlsColor as SliderColorType) || "black"],
            )}
            ref={(node) =>
              direction === "prev" ? setPrevEl(node) : setNextEl(node)
            }
          >
            <span className="sr-only">
              {direction === "prev"
                ? translations?.next_slide?.[language]
                : translations?.previous_slide?.[language]}
            </span>
            <IconLoader
              icon="chevrondown"
              className={cx("w-5 h-5", {
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
