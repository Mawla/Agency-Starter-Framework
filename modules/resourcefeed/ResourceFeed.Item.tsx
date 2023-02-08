import { Button } from "../../components/buttons/Button";
import Link from "../../components/buttons/Link";
import { DateDisplay } from "../../components/date/DateDisplay";
import ResponsiveImage from "../../components/images/ResponsiveImage";
import Text from "../../components/module/Text";
import Title from "../../components/module/Title";
import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { joinList, truncate } from "../../helpers/utils/string";
import { ImageType } from "../../types";
import { useContext } from "react";
import React from "react";

export type ResourceFeedItemProps = {
  _id: string;
  title: string;
  date: string;
  image?: ImageType;
  href: string;
  intro?: string;
  tags?: string[];
  authors?: { name: string; image?: ImageType }[];
};

export const ResourceFeedItem = ({
  title,
  date,
  image,
  href,
  intro,
  tags,
  authors,
}: ResourceFeedItemProps) => {
  const { language } = useContext(PageContext);
  const { config } = useContext(SiteContext);
  const translations = config.translations;

  return (
    <div className="relative bg-white rounded-md p-2 shadow-md group h-full border border-neutral-100 flex flex-col">
      <Link href={href} className="absolute inset-0 z-10">
        <span className="sr-only">{title}</span>
      </Link>

      {image && (
        <div className="relative aspect-video overflow-hidden rounded-sm">
          <ResponsiveImage
            {...image}
            fill
            className="group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      {authors && Boolean(authors?.length) && (
        <div className="absolute top-6 left-6 flex items-center gap-2">
          {authors.map(
            ({ image }) =>
              image && (
                <span className="w-5 aspect-square relative rounded-full overflow-hidden border border-white">
                  <ResponsiveImage {...image} fill />
                </span>
              ),
          )}

          <span className="text-sm">
            {joinList(authors.map((a) => a.name))}
          </span>
        </div>
      )}

      <div className="mt-2 p-4 flex flex-col gap-6">
        <Text size="sm" color="neutral-800">
          {tags && Boolean(tags?.length) && (
            <span className="">{joinList(tags)}</span>
          )}
          {" • "}
          {date && <DateDisplay datetime={date} />}
        </Text>

        {title && (
          <Title
            as="h3"
            size="2xl"
            color="neutral-800"
            className="group-hover:underline"
          >
            {title}
          </Title>
        )}

        {intro && (
          <Text size="md" color="neutral-600">
            {truncate(intro, 150)}
          </Text>
        )}
      </div>

      <div className="p-4 mt-auto" aria-hidden>
        <Button
          href={href}
          size="sm"
          icon="arrow"
          label={translations?.read_more?.[language]}
        />
      </div>
    </div>
  );
};

export default React.memo(ResourceFeedItem);
