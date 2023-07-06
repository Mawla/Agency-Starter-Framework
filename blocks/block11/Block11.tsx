import { TextProps } from "../../components/block/Text";
import { TitleProps } from "../../components/block/Title";
import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TestimonialCardProps } from "../../components/testimonials/TestimonialCard";
import {
  Testimonial,
  TestimonialsProps,
} from "../../components/testimonials/Testimonials";
import { HeadingLevelType } from "../../types";
import {
  TitleSizeType,
  TitleColorType,
  IntroColorType,
  IntroSizeType,
  AlignType,
} from "./block11.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/block/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/block/Text"),
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

const Testimonials = lazy<ComponentType<TestimonialsProps>>(
  () =>
    import(
      /* webpackChunkName: "Testimonials" */ "../../components/testimonials/Testimonials"
    ),
);

const TestimonialCard = lazy<ComponentType<TestimonialCardProps>>(
  () =>
    import(
      /* webpackChunkName: "TestimonialCard" */ "../../components/testimonials/TestimonialCard"
    ),
);

export type Block11Props = {
  theme?: {
    block?: {
      background?: BackgroundColorType;
      space?: SpaceType;
      align?: AlignType;
    };

    title?: {
      color?: TitleColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType;
    };

    intro?: {
      color?: IntroColorType;
      size?: IntroSizeType;
    };
  };

  title?: string;
  intro?: React.ReactNode;
  buttons?: ButtonProps[];
  testimonials?: TestimonialsProps["items"];
};

const alignClasses: Record<AlignType, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export const Block11 = ({
  theme,
  title,
  intro,
  testimonials,
  buttons,
}: Block11Props) => {
  // make three equal parts list for columns from the testimonials array
  const testimonialsColumns = testimonials?.reduce(
    (
      acc: [Testimonial[], Testimonial[], Testimonial[]],
      item: Testimonial,
      index: number,
    ) => {
      const listIndex = index % 3;
      acc[listIndex].push(item);
      return acc;
    },
    [[], [], []],
  );

  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div
        className={cx(
          "max-w-3xl",
          alignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <div className="mb-6">
            <Title
              size={theme?.title?.size || "4xl"}
              as={theme?.title?.level}
              color={theme?.title?.color}
            >
              {title}
            </Title>
          </div>
        )}

        {intro && (
          <div className="mb-6">
            <Text
              size={theme?.intro?.size || "xl"}
              color={theme?.intro?.color}
              align={theme?.block?.align || "center"}
            >
              <PortableText content={intro as any} />
            </Text>
          </div>
        )}
      </div>

      <div
        className={cx(
          "max-w-screen-xl",
          alignClasses[theme?.block?.align || "center"],
        )}
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-20">
          {testimonialsColumns?.map((testimonials, index) => (
            <div key={index}>
              {testimonials &&
                Boolean(testimonials?.filter(Boolean).length) && (
                  <Testimonials
                    items={testimonials}
                    RenderElement={TestimonialCard}
                  />
                )}
            </div>
          ))}
        </div>

        {buttons && Boolean(buttons?.filter(Boolean).length) && (
          <div className="mt-12 lg:mt-16">
            <ButtonGroup items={buttons} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block11);
