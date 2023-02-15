import { Button } from "../../components/buttons/Button";
import Link from "../../components/buttons/Link";
import { ResponsiveImageProps } from "../../components/images/ResponsiveImage";
import { TextProps } from "../../components/module/Text";
import { TitleProps } from "../../components/module/Title";
import { WrapperProps } from "../../components/module/Wrapper";
import { BackgroundColorType } from "../../components/module/background.options";
import { SpaceType } from "../../components/module/spacing.options";
import PortableText from "../../components/portabletext/PortableText";
import { PageContext } from "../../context/PageContext";
import { formatDate } from "../../helpers/utils/date";
import { joinList } from "../../helpers/utils/string";
import { ColorType, HeadingLevelType } from "../../types";
import { ImageType } from "../../types";
import { TitleSizeType } from "./resourcehero.options";
import React, { ComponentType, lazy, useContext } from "react";

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

const ResponsiveImage = lazy<ComponentType<ResponsiveImageProps>>(
  () =>
    import(
      /* webpackChunkName: "ResponsiveImageProps" */ "../../components/images/ResponsiveImage"
    ),
);

export type ResourceHeroProps = {
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
  title?: string;
  intro?: React.ReactNode;
  image?: ImageType;
  tags?: { title: string; href: string }[];
  authors?: { name: string; image?: ImageType }[];
  date?: string;
};

export const ResourceHero = ({
  theme,
  title,
  intro,
  image,
  tags,
  authors,
  date,
}: ResourceHeroProps) => {
  const { breadcrumb } = useContext(PageContext);
  const backLink = breadcrumb?.[breadcrumb.length - 2]?.path;

  return (
    <Wrapper
      theme={{
        background: "neutral-100",
        width: "full",
        space: {
          top: "none",
          bottom: "none",
        },
        rounded: {
          top: "none",
          bottom: "none",
        },
      }}
    >
      <div className="md:grid md:grid-cols-12 py-16 gap-16">
        <div className="md:col-span-7 flex flex-col gap-6 text-neutral-600">
          {backLink && (
            <div>
              <span className="-rotate-180 inline-block">
                <Button icon="arrow" href={backLink} variant="tertiary" />
              </span>
            </div>
          )}

          {title && (
            <Title
              size={theme?.title?.size || "3xl"}
              as={theme?.title?.level || "h1"}
              color={theme?.title?.color}
              eyebrow={(date && formatDate(date)) || ""}
            >
              {title}
            </Title>
          )}

          {intro && (
            <div className="">
              <Text color={theme?.text?.color || "neutral-800"}>
                <PortableText content={intro as any} />
              </Text>
            </div>
          )}

          {/* tags and date */}
          {tags && Boolean(tags?.length) && (
            <div className="flex gap-1 flex-wrap">
              {tags.filter(Boolean).map((tag) => (
                <Link
                  href={tag.href}
                  className="border border-neutral-300 py-1 px-2"
                >
                  {tag.title}
                </Link>
              ))}
            </div>
          )}

          {/* authors */}
          <div className="flex flex-col gap-4">
            {authors && Boolean(authors?.length) && (
              <div className="flex items-center gap-2">
                {authors.map(
                  ({ image }) =>
                    image && (
                      <span className="w-10 -mr-4 aspect-square relative rounded-full overflow-hidden border border-white">
                        <ResponsiveImage {...image} fill />
                      </span>
                    ),
                )}

                <span className="text-md ml-4">
                  {joinList(authors.map((a) => a.name))}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:col-span-5">
          {image && (
            <div className="w-full h-96 md:w-full md:h-full relative overflow-hidden rounded-lg">
              <ResponsiveImage {...image} fill className="absolute inset-0" />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(ResourceHero);
