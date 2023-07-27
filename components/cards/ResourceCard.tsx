import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { capitalize, joinList, truncate } from "../../helpers/utils/string";
import { backgroundClasses, borderClasses, textClasses } from "../../theme";
import { ColorType, ImageType, TranslationFieldType } from "../../types";
import { ResourceType } from "../../types.sanity";
import Link from "../buttons/Link";
import { DateDisplay } from "../date/DateDisplay";
import ResponsiveImage from "../images/ResponsiveImage";
import { TagProps } from "../tags/Tag";
import Text from "../text/Text";
import Title from "../title/Title";
import cx from "classnames";
import React, { ComponentType, lazy, useContext } from "react";

const Tag = lazy<ComponentType<TagProps>>(
  () => import(/* webpackChunkName: "Tag" */ "../tags/Tag"),
);

export type ResourceCardProps = {
  _id: string;
  type: ResourceType;
  title: string;
  date: string;
  image?: ImageType;
  href: string;
  intro?: string;
  tags?: string[];
  authors?: { name: string; image?: ImageType }[];
  theme?: {
    background?: ColorType;
    border?: ColorType;
    title?: ColorType;
    text?: ColorType;
    tag?: ColorType;
    author?: ColorType;
    date?: ColorType;
  };
};

export const ResourceCard = ({
  type,
  title,
  date,
  image,
  href,
  intro,
  tags,
  authors,
  theme,
}: ResourceCardProps) => {
  const { config } = useContext(SiteContext);
  const { language } = useContext(PageContext);
  const translations = config.translations;

  return (
    <div
      className={cx(
        "text-left relative rounded p-4 shadow-md group h-full border flex flex-col",
        borderClasses[theme?.border || "black"],
        backgroundClasses[theme?.background || "white"],
        {
          ["border-opacity-10"]: !theme?.border,
        },
      )}
    >
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
        <div className="flex gap-1 flex-wrap">
          {[
            translations?.[type.replace("page.", "") as TranslationFieldType]?.[
              language
            ] || capitalize(type.replace("page.", "")),
            ...(tags || []),
          ].map((tag) => (
            <Tag key={tag} label={tag} theme={{ color: theme?.tag }} />
          ))}
        </div>

        {title && (
          <Title
            as="h3"
            size="2xl"
            className="group-hover:underline"
            color={theme?.title || "black"}
          >
            {title}
          </Title>
        )}

        {intro && (
          <Text size="md" color={theme?.text || "black"}>
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
                      className={cx(
                        "w-10 aspect-square relative rounded-full overflow-hidden border -mr-1",
                        borderClasses[theme?.background || "white"],
                      )}
                      key={image.src}
                    >
                      <ResponsiveImage {...image} fill />
                    </span>
                  ),
              )}

              <span
                className={cx(
                  "text-sm ml-3 font-semibold",
                  textClasses[theme?.author || "black"],
                )}
              >
                {joinList(authors.map((a) => a.name))}

                {date && (
                  <span
                    className={cx(
                      "block font-normal text-xs mt-0.5",
                      textClasses[theme?.date || "black"],
                    )}
                  >
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

export default React.memo(ResourceCard);
