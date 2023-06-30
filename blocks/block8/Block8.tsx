import { TextProps } from "../../components/block/Text";
import { TitleProps } from "../../components/block/Title";
import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { HeadingLevelType, ImageType } from "../../types";
import {
  TitleSizeType,
  TitleColorType,
  IntroColorType,
  IntroSizeType,
  AlignType,
} from "./block8.options";
import cx from "classnames";
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

export type Block8Props = {
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

  items?: ItemProps[];
};

const alignClasses: Record<AlignType, string> = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export const Block8 = ({
  theme,

  title,
  intro,

  items,
}: Block8Props) => {
  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div
        className={cx(
          "max-w-3xl",
          alignClasses[theme?.block?.align || "center"]
        )}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center sm:py-16 lg:px-6">
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
          <div className="flex flex-row mt-8 space-x-24">
            {items &&
              Boolean(items?.filter(Boolean).length) &&
              items?.map((item: ItemProps) => (
                <Item key={item._key} {...item} />
              ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

type ItemProps = {
  _key: string;
  title: string;
  intro?: React.ReactNode;
  image?: ImageType;
  buttons?: ButtonProps[];
};

const Item = ({ _key, title, intro, image, buttons }: ItemProps) => {
  return (
    <div>
      <svg
        className="mx-auto mb-4 w-12 h-12 text-primary-600 dark:text-primary-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
          clip-rule="evenodd"
        ></path>
        <path
          fill-rule="evenodd"
          d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
          clip-rule="evenodd"
        ></path>
        <path
          fill-rule="evenodd"
          d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
      {title && (
        <div className="mb-6">
          <Title>{title}</Title>
        </div>
      )}{" "}
      <p className="mb-4 text-gray-500 dark:text-gray-400">
        We store the vast majority of the digital assets in secure offline
        storage.
      </p>
      <a
        href="#"
        className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400"
      >
        Learn how to keep your funds safe{" "}
        <svg
          className="ml-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default React.memo(Block8);
