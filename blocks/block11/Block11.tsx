import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TestimonialCardProps } from "../../components/testimonials/TestimonialCard";
import {
  TestimonialsProps,
  TestimonialType,
} from "../../components/testimonials/Testimonials";
import { TextProps } from "../../components/text/Text";
import {
  textAlignClasses,
  TextThemeType,
} from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

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
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    testimonials?: TestimonialCardProps["theme"];
  };

  title?: string;
  intro?: React.ReactNode;
  buttons?: ButtonProps[];
  testimonials?: TestimonialsProps["items"];
};

const gridClasses: Record<number, string> = {
  1: "grid grid-cols-1 sm:w-1/2 mx-auto",
  2: "grid grid-cols-1 sm:grid-cols-2 md:w-3/4 mx-auto",
  3: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
};

export const Block11 = ({
  theme,
  title,
  intro,
  testimonials,
  buttons,
}: Block11Props) => {
  // make three equal parts list for columns from the testimonials array
  const testimonialsColumns = testimonials
    ?.reduce(
      (
        acc: [TestimonialType[], TestimonialType[], TestimonialType[]],
        item: TestimonialType,
        index: number,
      ) => {
        const listIndex = index % 3;
        acc[listIndex].push(item);
        return acc;
      },
      [[], [], []],
    )
    .filter((x) => x.length);

  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div
        className={cx(
          "max-w-3xl",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <div className="mb-6">
            <Title
              size={theme?.title?.size || "4xl"}
              as={theme?.title?.level}
              color={theme?.title?.color}
              font={theme?.title?.font}
              weight={theme?.title?.weight}
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
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {testimonialsColumns?.length && (
          <div
            className={cx(
              "gap-8 grid mt-20",
              gridClasses[testimonialsColumns?.length],
            )}
          >
            {testimonialsColumns?.map((testimonials, index) => (
              <div key={index} className="space-y-6">
                {testimonials &&
                  Boolean(testimonials?.filter(Boolean).length) && (
                    <Testimonials
                      items={testimonials}
                      RenderElement={(props) => (
                        <TestimonialCard
                          {...props}
                          theme={theme?.testimonials}
                        />
                      )}
                    />
                  )}
              </div>
            ))}
          </div>
        )}
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
