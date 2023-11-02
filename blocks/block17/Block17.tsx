import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { DecorationProps } from "../../components/decorations/Decoration";
import { TestimonialPosterProps } from "../../components/testimonials/TestimonialPoster";
import { TestimonialsProps } from "../../components/testimonials/Testimonials";
import { textAlignClasses } from "../../components/text/text.options";
import { backgroundClasses } from "../../theme";
import { ColorType } from "../../types";
import cx from "clsx";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

const Testimonials = lazy<ComponentType<TestimonialsProps>>(
  () =>
    import(
      /* webpackChunkName: "Testimonials" */ "../../components/testimonials/Testimonials"
    ),
);

const TestimonialPoster = lazy<ComponentType<TestimonialPosterProps>>(
  () =>
    import(
      /* webpackChunkName: "TestimonialPoster" */ "../../components/testimonials/TestimonialPoster"
    ),
);

export type Block17Props = {
  theme?: {
    block?: BlockThemeType;
    testimonial?: TestimonialPosterProps["theme"];
    slider?: {
      controlsColor?: ColorType;
    };
  };
  decorations?: DecorationProps[];
  testimonials?: TestimonialsProps["items"];
};

export const Block17 = ({ theme, decorations, testimonials }: Block17Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
      decorations={decorations}
    >
      <div
        className={cx(
          "flex flex-col gap-6 max-w-4xl",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {testimonials && Boolean(testimonials?.filter(Boolean).length) && (
          <Testimonials
            items={testimonials}
            RenderElement={(props) => (
              <div
                className={cx(
                  "h-full",
                  theme?.block?.background &&
                    backgroundClasses[theme?.block?.background],
                )}
              >
                <TestimonialPoster
                  {...props}
                  theme={theme?.testimonial}
                  align={theme?.block?.align || "center"}
                />
              </div>
            )}
            slider={testimonials?.length > 1}
            sliderControlsColor={theme?.slider?.controlsColor}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block17);
