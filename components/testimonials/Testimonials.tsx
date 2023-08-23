import { SliderProps } from "../../components/slider/Slider";
import { ColorType, ImageType } from "../../types";
import { PortableTextProps } from "../portabletext/PortableText";
import React, { ComponentType, lazy } from "react";

const Slider = lazy<ComponentType<SliderProps>>(
  () =>
    import(/* webpackChunkName: "Slider" */ "../../components/slider/Slider"),
);

export type TestimonialType = {
  _key?: string;
  title?: string;
  image?: ImageType;
  name?: string;
  jobTitle?: string;
  content?: PortableTextProps["content"];
};

export type TestimonialsProps = {
  items?: TestimonialType[];
  RenderElement?: React.ComponentType<any>;
  slider?: boolean;
  sliderControlsColor?: ColorType;
};

export const Testimonials = ({
  items,
  RenderElement,
  slider,
  sliderControlsColor,
}: TestimonialsProps) => {
  if (!RenderElement) return null;

  return (
    <>
      {!slider &&
        items
          ?.filter(Boolean)
          .map((item) => (
            <RenderElement
              {...item}
              key={item._key || item.title || item.content}
            />
          ))}

      {slider && (
        <Slider
          gap={100}
          effect="fade"
          slides={items?.filter(Boolean).map((item) => (
            <RenderElement
              {...item}
              key={item._key || item.title || item.content}
            />
          ))}
          controlsColor={sliderControlsColor}
        />
      )}

      {/* Thought about adding json+ld snippets here,
      but not sure adding rich snippets here is 
      the best place, probably better to do that 
      site wide from CMS config */}
    </>
  );
};

export default React.memo(Testimonials);
