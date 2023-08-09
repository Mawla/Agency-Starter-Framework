import { imageQuery } from "../../components/images/image.query";
import {
  getOriginalImageDimensions,
  getResponsiveImageUrl,
} from "../../helpers/sanity/image-url";
import { withSentryOptional } from "../../helpers/sentry/with-sentry-optional";
import { baseLanguage } from "../../languages";
import { ImageType } from "../../types";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

const InterBlackFont = fetch(
  new URL("../../public/fonts/Inter-Black.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const InterBoldFont = fetch(
  new URL("../../public/fonts/Inter-Bold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const InterExtraBoldFont = fetch(
  new URL("../../public/fonts/Inter-ExtraBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const InterExtraLightFont = fetch(
  new URL("../../public/fonts/Inter-ExtraLight.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const InterLightFont = fetch(
  new URL("../../public/fonts/Inter-Light.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const InterMediumFont = fetch(
  new URL("../../public/fonts/Inter-Medium.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const InterRegularFont = fetch(
  new URL("../../public/fonts/Inter-Regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const InterSemiBoldFont = fetch(
  new URL("../../public/fonts/Inter-SemiBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const InterThinFont = fetch(
  new URL("../../public/fonts/Inter-Thin.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export const config = {
  runtime: "edge",
};

const PicoSanity = require("picosanity");

const sanityClient = new PicoSanity({
  dataset: process.env.SANITY_STUDIO_API_DATASET || "development",
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || "",
  apiVersion: "2021-03-25",
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: process.env.NODE_ENV === "production",
});

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const InterBlackFontData = await InterBlackFont;
  const InterBoldFontData = await InterBoldFont;
  const InterExtraBoldFontData = await InterExtraBoldFont;
  const InterExtraLightFontData = await InterExtraLightFont;
  const InterLightFontData = await InterLightFont;
  const InterMediumFontData = await InterMediumFont;
  const InterRegularFontData = await InterRegularFont;
  const InterSemiBoldFontData = await InterSemiBoldFont;
  const InterThinFontData = await InterThinFont;

  let id = searchParams.get("id");
  let language = searchParams.get("language") || baseLanguage;
  if (!id) id = `page_homepage__i18n_${language}`;

  type DataType = {
    logoImage?: string;
    heroImage?: ImageType;
    title?: string;
    seoImage?: string;
    globalOpenGraphImage?: {
      background?: string;
      color?: string;
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
      color
    },
    "date": publishedAt,
    "authors": authors[]-> { 
      name, 
      "image": ${imageQuery} 
    },
  }`);

  let logoHeight;
  if (data?.logoImage) {
    logoHeight = getOriginalImageDimensions(data?.logoImage).height;
  }

  // seo image takes precedence
  if (data?.seoImage) {
    return new ImageResponse(CoverImage(data?.seoImage));
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
                <img src={data?.logoImage} />
              </div>
            )}

            {data?.title && (
              <div
                style={{
                  color: data?.globalOpenGraphImage?.color || "#111",
                  fontSize: 60,
                  fontWeight: 600,
                  fontFamily: "InterMedium",
                  width: "100%",
                  display: "flex",
                  justifyContent: heroImage ? "flex-start" : "center",
                  textAlign: heroImage ? "left" : "center",
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
                        opacity: 0.5,
                        fontWeight: 600,
                        fontFamily: "InterMedium",
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
                opacity: 0.75,
                fontWeight: 600,
                fontFamily: "InterMedium",
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
        { name: "InterBlack", data: InterBlackFontData, style: "normal" },
        { name: "InterBold", data: InterBoldFontData, style: "normal" },
        {
          name: "InterExtraBold",
          data: InterExtraBoldFontData,
          style: "normal",
        },
        {
          name: "InterExtraLight",
          data: InterExtraLightFontData,
          style: "normal",
        },
        { name: "InterLight", data: InterLightFontData, style: "normal" },
        { name: "InterMedium", data: InterMediumFontData, style: "normal" },
        { name: "InterRegular", data: InterRegularFontData, style: "normal" },
        { name: "InterSemiBold", data: InterSemiBoldFontData, style: "normal" },
        { name: "InterThin", data: InterThinFontData, style: "normal" },
      ],
    },
  );
};

export default withSentryOptional(handler);

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
