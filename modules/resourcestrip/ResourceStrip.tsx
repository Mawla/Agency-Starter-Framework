import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { WrapperProps } from "../../components/module/Wrapper";
import { BackgroundColorType } from "../../components/module/background.options";
import { SpaceType } from "../../components/module/spacing.options";
import PortableText from "../../components/portabletext/PortableText";
import { ColorType, HeadingLevelType } from "../../types";
import { ResourceFeedItemProps } from "../resourcefeed/ResourceFeed.Item";
import { TitleSizeType } from "./resourcestrip.options";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/module/Text"),
);

const ResourceFeedItem = lazy<ComponentType<ResourceFeedItemProps>>(
  () =>
    import(
      /* webpackChunkName: "ResourceFeedItem" */ "../resourcefeed/ResourceFeed.Item"
    ),
);

export type ResourceStripProps = {
  theme?: {
    module?: {
      background?: BackgroundColorType;
      space?: SpaceType;
    };
    title?: {
      color?: ColorType;
      size?: TitleSizeType;
      level?: HeadingLevelType;
    };
    text?: {
      color?: ColorType;
    };
  };
  eyebrow?: string;
  title?: string;
  intro?: React.ReactNode;
  items?: ResourceFeedItemProps[];
};

export const ResourceStrip = ({
  theme,
  eyebrow,
  title,
  intro,
  items,
}: ResourceStripProps) => {
  if (!items?.length) return null;

  return (
    <Wrapper
      theme={{
        ...theme?.module,
      }}
    >
      {title && (
        <div className="mb-4 md:mb-6">
          <Title
            size={theme?.title?.size || "lg"}
            as={theme?.title?.level}
            color={theme?.title?.color}
            eyebrow={eyebrow}
          >
            {title}
          </Title>
        </div>
      )}

      {intro && (
        <div className="mb-10 md:mb-14">
          <Text color={theme?.text?.color}>
            <PortableText content={intro as any} />
          </Text>
        </div>
      )}

      {Boolean(items?.length) && (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items?.map((item) => (
            <li key={item._id}>
              <ResourceFeedItem {...item} />
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default React.memo(ResourceStrip);
