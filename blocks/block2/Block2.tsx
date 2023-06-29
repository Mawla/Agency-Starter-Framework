import { TextProps } from "../../components/block/Text";
import { TitleProps } from "../../components/block/Title";
import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { HeadingLevelType, ImageType } from "../../types";
import {
  TitleSizeType,
  TitleColorType,
  IntroColorType,
} from "./block2.options";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/block/Wrapper")
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/block/Title")
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/block/Text")
);

const PortableText = lazy<ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/portabletext/PortableText"
    )
);

const ButtonGroup = lazy<ComponentType<ButtonGroupProps>>(
  () =>
    import(
      /* webpackChunkName: "ButtonGroup" */ "../../components/buttons/ButtonGroup"
    )
);

export type Block2Props = {
  theme?: {
    block?: {
      background?: BackgroundColorType;
      space?: SpaceType;
    };

    title?: {
      color?: TitleColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType;
    };

    intro?: {
      color?: IntroColorType;
    };
  };

  title?: string;
  intro?: React.ReactNode;

  buttons?: ButtonProps[];
  items?: ItemProps[];
};

export const Block2 = ({
  theme,

  title,
  intro,

  buttons,
  items,
}: Block2Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <section className="bg-white dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            {title && (
              <div className="mb-4 md:mb-6">
                <Title
                  size={theme?.title?.size || "xl"}
                  as={theme?.title?.level}
                  color={theme?.title?.color}
                >
                  {title}
                </Title>
              </div>
            )}
            {intro && (
              <div className="mb-10 md:mb-14">
                <Text size={"sm"} color={theme?.intro?.color}>
                  <PortableText content={intro as any} />
                </Text>
              </div>
            )}
          </div>

          <div className="p-4 mt-8 rounded-lg sm:p-12 lg:mt-16 bg-gray-50 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
              {items && Boolean(items?.filter(Boolean).length) && (
                <ul className="pt-8">
                  {items?.map((item) => {
                    return <Item key={item._key} {...item} />;
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-8 text-center lg:mt-16">
            {buttons && Boolean(buttons?.filter(Boolean).length) && (
              <div className="mt-8 lg:mt-12">
                <ButtonGroup items={buttons} />
              </div>
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

type ItemProps = {
  title?: string;
  intro?: React.ReactNode;
  image?: ImageType;
  _key?: string;
};
const Item = ({ title, intro, image, _key }: ItemProps) => {
  return (
    <div className="flex flex-col items-start gap-4 sm:gap-5 sm:flex-row">
      <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 lg:w-24 lg:h-24 flex items-center justify-center shrink-0">
        <svg
          aria-hidden="true"
          className="w-10 lg:w-12 h-10 lg:h-12 text-primary-600 dark:text-primary-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      </div>
      <div>
        {title && (
          <div className="mb-4 md:mb-6">
            <Title>{title}</Title>
          </div>
        )}
        {intro && (
          <div className="mb-10 md:mb-14">
            <Text size={"sm"}>
              <PortableText content={intro as any} />
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Block2);
