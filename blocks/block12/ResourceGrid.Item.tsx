import Link from "../../components/buttons/Link";
import { DateDisplay } from "../../components/date/DateDisplay";
import ResponsiveImage from "../../components/images/ResponsiveImage";
import { TagProps } from "../../components/tags/Tag";
import Text from "../../components/text/Text";
import Title from "../../components/title/Title";
import { joinList, truncate } from "../../helpers/utils/string";
import { ColorType, ImageType } from "../../types";
import React, { ComponentType, lazy } from "react";

const Tag = lazy<ComponentType<TagProps>>(
  () => import(/* webpackChunkName: "Tag" */ "../../components/tags/Tag"),
);

export type ResourceGridItemProps = {
  _id: string;
  title: string;
  date: string;
  image?: ImageType;
  href: string;
  intro?: string;
  tags?: string[];
  authors?: { name: string; image?: ImageType }[];
  theme?: {
    titleColor?: ColorType;
    textColor?: ColorType;
  };
};

export const ResourceGridItem = ({
  title,
  date,
  image,
  href,
  intro,
  tags,
  authors,
  theme,
}: ResourceGridItemProps) => {
  return (
    <div className="text-left relative bg-white rounded p-4 shadow-md group h-full border border-gray-200 flex flex-col">
      <Link href={href} className="absolute inset-0 z-10">
        <span className="sr-only">{title}</span>
      </Link>

      {image && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <ResponsiveImage
            {...image}
            fill
            className="group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      <div className="mt-2 flex flex-col gap-6 p-3">
        {tags && Boolean(tags?.length) && (
          <div className="flex gap-1 flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}

        {title && (
          <Title
            as="h3"
            size="2xl"
            className="group-hover:underline"
            color={theme?.titleColor || "black"}
          >
            {title}
          </Title>
        )}

        {intro && (
          <Text size="md" color={theme?.textColor || "black"}>
            {truncate(intro, 150)}
          </Text>
        )}

        <div className="mt-auto flex flex-col gap-3">
          {authors && Boolean(authors?.length) && (
            <div className="flex items-start">
              {authors.map(
                ({ image }) =>
                  image && (
                    <span
                      className="w-10 aspect-square relative rounded-full overflow-hidden border border-white -mr-1"
                      key={image.src}
                    >
                      <ResponsiveImage {...image} fill />
                    </span>
                  ),
              )}

              <span className="text-sm ml-3 font-semibold">
                {joinList(authors.map((a) => a.name))}

                {date && (
                  <span className="block font-normal text-xs mt-0.5">
                    <DateDisplay datetime={date} />
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ResourceGridItem);
