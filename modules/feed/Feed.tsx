import { TitleProps } from "../../components/module/Title";
import { WrapperProps } from "../../components/module/Wrapper";
import { BackgroundColorType } from "../../components/module/background.options";
import { SpaceType } from "../../components/module/spacing.options";
import { ColorType, HeadingLevelType } from "../../types";
import { FeedItem } from "./Feed.Item";
import { TitleSizeType } from "./feed.options";
import cx from "classnames";
import React, { ComponentType, lazy } from "react";

const Wrapper = lazy<ComponentType<WrapperProps>>(
  () =>
    import(/* webpackChunkName: "Wrapper" */ "../../components/module/Wrapper"),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/module/Title"),
);

export type FeedProps = {
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
  items?: FeedItem[];
  tags?: string[];
};

export const Feed = ({ theme, eyebrow, title, items, tags }: FeedProps) => {
  const [currentTag, setCurrentTag] = React.useState<string | null>(null);

  const filteredItems = items?.filter((item) => {
    if (!currentTag) return true;
    return item.tags?.includes(currentTag);
  });

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

      {tags && Boolean(tags?.length) && (
        <div className="mb-4 md:mb-6">
          <ul className="flex flex-wrap gap-2">
            {tags?.filter(Boolean).map((tag) => (
              <li key={tag}>
                <button
                  className={cx("text-md py-1 px-2 border", {
                    [" bg-white border-neutral-300"]: currentTag !== tag,
                    ["text-white bg-neutral-600 border-neutral-600"]:
                      currentTag === tag,
                  })}
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
              <FeedItem {...item} />
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default React.memo(Feed);
