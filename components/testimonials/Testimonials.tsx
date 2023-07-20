import { ImageType } from "../../types";
import { PortableTextProps } from "../portabletext/PortableText";
import React from "react";

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
};

export const Testimonials = ({ items, RenderElement }: TestimonialsProps) => {
  if (!RenderElement) return null;

  return (
    <>
      {items?.filter(Boolean).map((item) => (
        <RenderElement
          {...item}
          key={item._key || item.title || item.content}
        />
      ))}

      {/* Thought about adding json+ld snippets here,
      but not sure adding rich snippets here is 
      the best place, probably better to do that 
      site wide from CMS config */}
    </>
  );
};

export default React.memo(Testimonials);
