import { Link } from "../../components/buttons/Link";
import { IconLoader } from "../../components/images/IconLoader";
import { ResponsiveImage } from "../../components/images/ResponsiveImage";
import { ScriptJsonLd } from "../../components/meta/ScriptJsonLd";
import { SpaceType } from "../../components/module/SpacingOptions";
import { Width } from "../../components/module/Width";
import { WidthType } from "../../components/module/WidthOptions";
import { Wrapper } from "../../components/module/Wrapper";
import { PageContext } from "../../context/PageContext";
import { SiteContext } from "../../context/SiteContext";
import { getURLForPath } from "../../helpers/sitemap/getURLForPath";
import { ImageType, PersonType } from "../../types";
import { StoryAlignType, StoryBackgroundColorType } from "./StoryOptions";
import cx from "classnames";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export type StoryProps = {
  theme?: {
    module?: {
      space?: SpaceType;
      width?: WidthType;
      background?: StoryBackgroundColorType;
    };
    image?: {
      align?: StoryAlignType;
    };
    quote?: {
      showQuotes: boolean;
    };
  };
  label?: string;
  quote?: string;
  text?: string | null;
  person?: PersonType;
  image?: ImageType | null;
  backgroundImage?: ImageType;
  videoLink?: string;
};

export const Story = ({
  theme,
  label,
  quote,
  person,
  text,
  image,
  backgroundImage,
  videoLink,
}: StoryProps) => {
  const { language } = useContext(PageContext);
  const { config } = useContext(SiteContext);
  const router = useRouter();
  const translations = config.translations;

  const storyJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: config?.general?.name,
      description: config?.seo?.description,
      logo: `${getURLForPath(config?.general?.domain, "/logo.svg")}`,
      url: getURLForPath(config?.general?.domain, router?.asPath, language),
      sameAs: config?.social?.socials,
    },
    name: quote,
    description: text,
    author: {
      "@type": "Person",
      name: person?.name,
    },
  };

  return (
    <Wrapper
      theme={{
        ...theme?.module,
        background: theme?.module?.background || "neutral-base",
        rounded: {
          top: "md",
          bottom: "md",
        },
      }}
      className="relative "
      innerClassName="overflow-hidden bg-gradient-to-tr from-neutral-base/50 to-neutral-base/0"
    >
      {backgroundImage && (
        <div className="absolute pointer-events-none z-0 inset-0">
          <ResponsiveImage {...backgroundImage} fill roundSize={25} />
        </div>
      )}

      <Width className="text-white relative z-30 py-5 sm:py-10 md:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2">
        <blockquote
          className={cx(
            "flex flex-col gap-6 lg:gap-8 justify-center z-30 row-start-2 max-w-[600px]",
            {
              ["-mx-3 sm:mx-0"]: backgroundImage,
              ["md:col-start-1"]: theme?.image?.align === "right",
              ["md:col-start-2 md:text-right md:items-end"]:
                theme?.image?.align === "left",
            },
          )}
        >
          {/* no content: add placeholder to size the image */}
          {!label && !text && !quote && (
            <div className="w-full aspect-[16/9]" />
          )}

          {label && (
            <span className="text-lg font-bold md:opacity-75">{label}</span>
          )}

          {backgroundImage && <span className="block h-10 md:h-8" />}

          <div
            className={cx(
              "min-h-[15vw] md:min-h-[min(30vw,500px)] flex flex-col justify-center gap-6 lg:gap-8 ",
              {
                ["md:text-right md:items-end"]: theme?.image?.align === "left",
              },
            )}
          >
            {quote && (
              <p className="relative text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed sm:max-w-[75%] md:max-w-none">
                {theme?.quote?.showQuotes !== false && (
                  <>
                    {theme?.module?.width !== "inner" &&
                    theme?.image?.align !== "left" ? (
                      <span className="absolute top-0 -left-0 -translate-x-[120%]">
                        &ldquo;
                      </span>
                    ) : (
                      <>&ldquo;</>
                    )}
                  </>
                )}
                {quote}
                {theme?.quote?.showQuotes !== false && <>&rdquo;</>}
              </p>
            )}

            {text && (
              <p className="opacity-75 max-w-[450px] text-lg md:text-xl">
                {text}
              </p>
            )}

            {(person?.name || person?.position) && (
              <span className="text-lg md:text-xl">
                <strong>{person?.name}</strong>
                {person?.position && (
                  <span>
                    {person?.name ? ", " : ""}
                    {person?.position}
                  </span>
                )}
              </span>
            )}

            {backgroundImage && <span className="hidden md:block h-8" />}

            {videoLink && (
              <Link href={videoLink}>
                <span className="group inline-flex gap-4 flex-row items-center">
                  <span className="order-1 text-xl md:text-2xl lg:text-3xl font-bold group-hover:underline underline-offset-4">
                    {translations?.watch_video?.[language]}
                  </span>
                  <span
                    className={cx(
                      "bg-black group-hover:bg-black group-hover:scale-105 transition-all rounded-full w-10 md:w-16 lg:w-20 h-10 md:h-16 lg:h-20 grid",
                      {
                        ["md:order-1"]: theme?.image?.align === "left",
                        ["md:order-0"]: theme?.image?.align === "right",
                      },
                    )}
                  >
                    <IconLoader
                      icon="play"
                      className="text-white group-hover:text-action-dark place-self-center w-4 md:w-6 lg:w-8 h-4 md:h-6 lg:h-8 translate-x-[1px] md:translate-x-[2px] lg:translate-x-[3px]"
                    />
                  </span>
                </span>
              </Link>
            )}
          </div>
        </blockquote>

        {image && (
          <div className="relative md:static h-20 md:h-auto mb-4 md:mb-0">
            <div
              className={cx(
                "rounded-full md:rounded-none overflow-hidden bg-neutral-95 md:bg-transparent",
                "h-full aspect-square pointer-events-none z-20",
                "absolute top-0 left-0 md:-bottom-0 md:top-auto",
                {
                  ["md:-left-24 lg:-left-1/4 xl:-left-32 2xl:left-0"]:
                    theme?.image?.align === "left",
                  ["md:left-1/2"]: theme?.image?.align !== "left",
                },
              )}
            >
              <ResponsiveImage {...image} fill />
            </div>
          </div>
        )}
      </Width>
      <ScriptJsonLd data={storyJsonLd} />
    </Wrapper>
  );
};

export default React.memo(Story);
