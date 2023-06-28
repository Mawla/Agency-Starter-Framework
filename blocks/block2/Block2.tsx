import { TextProps } from "../../components/block/Text";
import { TitleProps } from "../../components/block/Title";
import { WrapperProps } from "../../components/block/Wrapper";
import { BackgroundColorType } from "../../components/block/background.options";
import { SpaceType } from "../../components/block/spacing.options";
import { ButtonProps } from "../../components/buttons/Button";
import { ButtonGroupProps } from "../../components/buttons/ButtonGroup";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { HeadingLevelType } from "../../types";
import {
  TitleSizeType,
  TitleColorType,
  IntroColorType,
} from "./block2.options";
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
  items?: { _key?: string; title?: string }[];
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

      {items && Boolean(items?.filter(Boolean).length) && (
        <ul className="pt-8">
          {items?.map(({ title, _key }) => (
            <li key={_key} className="">
              {title}
            </li>
          ))}
        </ul>
      )}

      {buttons && Boolean(buttons?.filter(Boolean).length) && (
        <div className="mt-8 lg:mt-12">
          <ButtonGroup items={buttons} />
        </div>
      )}
    </Wrapper>
  );
};

export default React.memo(Block2);
