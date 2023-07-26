import { WrapperProps } from "../../components/block/Wrapper";
import { BlockThemeType } from "../../components/block/block.options";
import { PortableTextProps } from "../../components/portabletext/PortableText";
import { TextProps } from "../../components/text/Text";
import { textAlignClasses } from "../../components/text/text.options";
import { TextThemeType } from "../../components/text/text.options";
import { TitleProps } from "../../components/title/Title";
import { TitleThemeType } from "../../components/title/title.options";
import { ColorType } from "../../types";
import { ResourceGridItemProps } from "./ResourceGrid.Item";
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

const ResourceGridItem = lazy<ComponentType<ResourceGridItemProps>>(
  () =>
    import(/* webpackChunkName: "ResourceGridItem" */ "./ResourceGrid.Item"),
);

export type Block12Props = {
  theme?: {
    block?: BlockThemeType;
    title?: TitleThemeType;
    intro?: TextThemeType;
    tags?: {
      display?: boolean;
    };
    card?: ResourceGridItemProps["theme"];
  };
  title?: string;
  intro?: React.ReactNode;
  items?: ResourceGridItemProps[];
  tags?: string[];
};

export const Block12 = ({ theme, title, intro, items, tags }: Block12Props) => {
  const [currentTag, setCurrentTag] = React.useState<string | null>(null);

  const filteredItems = items?.filter((item) => {
    if (!currentTag) return true;
    return item.tags?.includes(currentTag);
  });

  return (
    <Wrapper
      theme={{
        ...theme?.block,
      }}
    >
      <div
        className={cx(
          "flex flex-col gap-6",
          textAlignClasses[theme?.block?.align || "center"],
        )}
      >
        {title && (
          <Title {...theme?.title} size={theme?.title?.size || "4xl"}>
            {title}
          </Title>
        )}

        {intro && (
          <Text
            size={theme?.intro?.size || "xl"}
            color={theme?.intro?.color}
            align={theme?.block?.align || "center"}
          >
            <PortableText content={intro as any} />
          </Text>
        )}

        {tags && theme?.tags?.display !== false && Boolean(tags?.length) && (
          <div className="mb-4 md:mb-6">
            <ul className="flex flex-wrap gap-2">
              {tags?.filter(Boolean).map((tag) => (
                <li key={tag}>
                  <button
                    className={cx(
                      "transition-all font-semibold text-md rounded py-1 px-2 bg-black/5 hover:bg-black/10 text-black/80",
                      {
                        ["opacity-50"]: currentTag && currentTag !== tag,
                      },
                    )}
                    onClick={() =>
                      currentTag === tag
                        ? setCurrentTag(null)
                        : tag && setCurrentTag(tag)
                    }
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {Boolean(filteredItems?.length) && (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems?.map((item) => (
              <li key={item._id}>
                <ResourceGridItem {...item} theme={theme?.card} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(Block12);
