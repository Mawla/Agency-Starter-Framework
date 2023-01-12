import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { IconLoader } from "../images/IconLoader";
import { SliderColorType } from "./SliderOptions";
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

const controlsColorClasses: Record<SliderColorType, string> = {
  white:
    "border-white text-white disabled:bg-white/10 disabled:border-white/0 disabled:text-white/75",
  "action-base":
    "border-action-base text-action-base disabled:bg-neutral-95 disabled:border-neutral-95 disabled:text-neutral-50",
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
      <Swiper
        spaceBetween={gap}
        slidesPerView={columns}
        // slidesPerGroup={columns} // this sort of breaks dragging behaviour, removing it for now
        grabCursor={!slides?.some((slide) => slide?.props?.href)}
        // centeredSlides={true}
        modules={[
          Keyboard,
          // Pagination,
          Navigation,
        ]}
        simulateTouch={true}
        // preventClicks={false}
        // preventClicksPropagation={false}
        navigation={{ prevEl, nextEl }}
        // autoHeight={true}
        keyboard={{
          enabled: true,
        }}
        // pagination={{
        //   clickable: true,
        //   type: 'bullets',
        // }}
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
              "border-2 rounded-full flex items-center justify-center w-10 h-10 transition-colors",
              controlsColorClasses[
                (controlsColor as SliderColorType) || "action-base"
              ]
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
              icon="chevron"
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
