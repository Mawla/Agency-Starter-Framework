import { imageQuery } from "../../components/images/image.query";
import {
  getOriginalImageDimensions,
  getResponsiveImageUrl,
} from "../../helpers/sanity/image-url";
import { baseLanguage } from "../../languages";
import { ImageType } from "../../types";
import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "edge",
  maxDuration: 60,
};

const PicoSanity = require("picosanity");

const sanityClient = new PicoSanity({
  dataset: process.env.SANITY_STUDIO_API_DATASET || "development",
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || "",
  apiVersion: "2021-03-25",
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  const { searchParams } = new URL(req.url || "");

  let language = searchParams.get("language") || baseLanguage;
  let id = searchParams.get("id") || `page_homepage__i18n_${language}`;

  type DataType = {
    logoImage?: string;
    heroImage?: ImageType;
    title?: string;
    seoImage?: string;
    globalOpenGraphImage?: {
      background?: string;
      color?: string;
      titleFont?: string;
      metaFont?: string;
    };
    date?: string;
    authors?: {
      name?: string;
      image?: ImageType;
    }[];
  };

  const data: DataType = await sanityClient.fetch(`*[_id == "${id}"][0] {
    "logoImage": *[_id == 'navigation__i18n_${language}'][0].logo.desktop.asset -> url,
    "heroImage": blocks[0] { 
      "image": ${imageQuery},
    }.image,
    "title": coalesce(seo.title, title),
    "seoImage": seo.image.asset -> url,
    "globalOpenGraphImage": *[_id == 'config_seo'][0].opengraphimage {
      "background": background.asset -> url,
      color,
      "titleFont": titleFont.asset -> originalFilename,
      "metaFont": metaFont.asset -> originalFilename,
    },
    "date": publishedAt,
    "authors": authors[]-> { 
      name, 
      "image": ${imageQuery} 
    },
  }`);

  // seo image takes precedence
  if (data?.seoImage) {
    return new ImageResponse(CoverImage(data?.seoImage));
  }

  const titleFontData = await fetch(
    new URL("../../public/downloads/ogTitleFont.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const metaFontData = await fetch(
    new URL("../../public/downloads/ogTitleFont.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  let logoHeight;
  if (data?.logoImage) {
    logoHeight = getOriginalImageDimensions(data?.logoImage).height;
    if (isNaN(logoHeight) || logoHeight > 75) logoHeight = 75;
  }

  let heroImage;
  if (data?.heroImage) {
    heroImage = getResponsiveImageUrl(data?.heroImage as any);
  }

  let authorImages: string[];
  if (data?.authors) {
    authorImages = (data?.authors)
      .filter((author) => author.image)
      .map(({ image }) => {
        return getResponsiveImageUrl({
          ...image,
          width: 100,
          height: 100,
        } as any);
      })
      .filter(Boolean) as string[];
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {data?.globalOpenGraphImage?.background && (
          <div
            style={{
              display: "flex",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            {CoverImage(data?.globalOpenGraphImage?.background)}
          </div>
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          {/* content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: heroImage ? "50%" : "100%",
              height: "100%",
              padding: 60,
              alignItems: heroImage ? "flex-start" : "center",
              justifyContent: "center",
            }}
          >
            {data?.logoImage && (
              <div
                style={{
                  display: "flex",
                  marginBottom: 40,
                  marginTop: logoHeight ? -logoHeight - 40 : 0,
                }}
              >
                <img
                  src={data?.logoImage}
                  style={{
                    height: logoHeight,
                  }}
                />
              </div>
            )}

            {data?.title && (
              <div
                style={{
                  color: data?.globalOpenGraphImage?.color || "#111",
                  fontSize: heroImage ? 40 : 60,
                  fontWeight: 600,
                  fontFamily: "TitleFont",
                  width: "100%",
                  display: "flex",
                  justifyContent: heroImage ? "flex-start" : "center",
                  textAlign: heroImage ? "left" : "center",
                  lineHeight: 1.2,
                }}
              >
                {data?.title}
              </div>
            )}
          </div>

          {/* image column */}
          {heroImage && (
            <div
              style={{
                display: "flex",
                width: "50%",
                height: "100%",
                alignItems: "center",
                padding: 60,
              }}
            >
              <img src={heroImage} width={600} />
            </div>
          )}
        </div>

        {/* meta */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 60,
            right: 60,
            bottom: 60,
            gap: 12,
            alignItems: "center",
            fontFamily: "MetaFont",
          }}
        >
          {data?.authors && (
            <div
              style={{
                display: "flex",
                gap: 4,
                marginRight: 24,
              }}
            >
              {data?.authors.map((author, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    {author.image && (
                      <img
                        src={authorImages[index]}
                        width={32}
                        height={32}
                        style={{
                          borderRadius: "100%",
                          marginRight: 8,
                        }}
                      />
                    )}

                    <div
                      style={{
                        color: data?.globalOpenGraphImage?.color || "#111",
                        fontSize: 24,
                        opacity: 0.6,
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      {author.name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {data?.date && (
            <div
              style={{
                color: data?.globalOpenGraphImage?.color || "#111",
                fontSize: 24,
                opacity: 0.6,
                fontWeight: 600,
                textAlign: "center",
                marginLeft: "auto",
              }}
            >
              {data?.date}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "TitleFont", data: titleFontData, style: "normal" },
        { name: "MetaFont", data: metaFontData, style: "normal" },
      ],
    },
  );
};

export default handler;

const CoverImage = (imageURL: string) => {
  let image;
  if (imageURL) {
    image = getResponsiveImageUrl({
      src: imageURL,
      width: 1200,
      height: 630,
      crop: null,
      hotspot: null,
    });
  }

  if (image) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={image}
          style={{
            width: 1200,
            height: 630,
          }}
        />
      </div>
    );
  }
  return <div />;
};
