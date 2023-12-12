import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { TextProps } from "../../components/text/Text";
import { TitleProps } from "../../components/title/Title";
import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { capitalize, joinList, truncate } from "../../helpers/utils/string";
import { backgroundClasses, borderClasses, textClasses } from "../../theme";
import { ColorType, ImageType, TranslationFieldType } from "../../types";
import { ResourceType } from "../../types.sanity";
import { LinkProps } from "../buttons/Link";
import { DateDisplayProps } from "../date/DateDisplay";
import { TagProps } from "../tags/Tag";
import cx from "clsx";
import React, { ComponentType, lazy, useContext } from "react";

const Tag = lazy<ComponentType<TagProps>>(
  () => import(/* webpackChunkName: "Tag" */ "../tags/Tag"),
);

const Link = lazy<ComponentType<LinkProps>>(
  () => import(/* webpackChunkName: "Link" */ "../buttons/Link"),
);

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImage" */ "../../components/images/ResponsiveImage"
    ),
);

const Title = lazy<ComponentType<TitleProps>>(
  () => import(/* webpackChunkName: "Title" */ "../../components/title/Title"),
);

const Text = lazy<ComponentType<TextProps>>(
  () => import(/* webpackChunkName: "Text" */ "../../components/text/Text"),
);

const DateDisplay = lazy<ComponentType<DateDisplayProps>>(
  () =>
    import(
      /* webpackChunkName: "DateDisplay" */ "../../components/date/DateDisplay"
    ),
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
  startDate?: string;
  endDate?: string;
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
  startDate,
  endDate,
}: ResourceCardProps) => {
  const { config } = useContext(SiteContext);
  const { language } = useContext(PageContext);
  const translations = config.translations;

  return (
    <div
      className={cx(
        "text-left relative rounded shadow-md group h-full border flex flex-col",
        theme?.border && borderClasses[theme?.border],
        theme?.background && backgroundClasses[theme?.background],
        {
          ["border-opacity-10"]: !theme?.border,
        },
      )}
    >
      <Link href={href} className="absolute inset-0 z-10">
        <span className="sr-only">{title}</span>
      </Link>

      {image && (
        <div className="relative aspect-video overflow-hidden m-0.5 shrink-0">
          <ResponsiveImage
            {...image}
            fill
            className="group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      <div className="mt-2 flex flex-col gap-6 px-4 pt-4 pb-6 grow">
        {title && (
          <Title
            as="h3"
            size="2xl"
            className="group-hover:underline"
            color={theme?.title}
          >
            {title}
          </Title>
        )}

        {intro && (
          <Text size="md" color={theme?.text}>
            {truncate(intro, 150)}
          </Text>
        )}

        <div className="mt-auto flex flex-col gap-3">
          {authors && Boolean(authors?.length) ? (
            <div className="flex items-start">
              {authors?.filter(Boolean).map(
                ({ image }) =>
                  image && (
                    <span
                      className={cx(
                        "w-10 aspect-square relative rounded-full overflow-hidden border -mr-3",
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
                  "ml-5 text-sm font-semibold",
                  theme?.author && textClasses[theme?.author],
                )}
              >
                {joinList(authors.filter(Boolean).map((a) => a.name))}

                {date && (
                  <span
                    className={cx(
                      "block font-normal text-xs mt-0.5",
                      theme?.date && textClasses[theme?.date],
                    )}
                  >
                    <DateDisplay
                      datetime={date}
                      from={startDate}
                      to={endDate}
                    />
                  </span>
                )}
              </span>
            </div>
          ) : (
            <span
              className={cx(
                "block font-normal text-xs mt-0.5",
                theme?.date && textClasses[theme?.date],
              )}
            >
              <DateDisplay datetime={date} from={startDate} to={endDate} />
            </span>
          )}
        </div>

        <div className="flex gap-1 flex-wrap -mt-2">
          {[
            translations?.[type.replace("page.", "") as TranslationFieldType]?.[
              language
            ] || capitalize(type.replace("page.", "")),
            ...(tags || []),
          ].map((tag) => (
            <Tag key={tag} label={tag} theme={{ color: theme?.tag }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ResourceCard);
