import { imageQuery } from "../../components/images/image.query";
import { getResponsiveImageUrl } from "../../helpers/sanity/image-url";
import { withSentryOptional } from "../../helpers/sentry/with-sentry-optional";
import { baseLanguage } from "../../languages";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

const InterMediumFont = fetch(
  new URL("../../public/fonts/Inter-Medium.ttf", import.meta.url),
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
  const InterMediumfontData = await InterMediumFont;

  let id = searchParams.get("id");
  let language = searchParams.get("language") || baseLanguage;
  if (!id) id = `page_homepage__i18n_${language}`;

  const data = await sanityClient.fetch(`*[_id == "${id}"][0] {
    "heroImage": blocks[0] { 
      "image": ${imageQuery},
    }.image,
    "logoImage": *[_id == 'navigation__i18n_${language}'][0].logo.desktop.asset -> url,
    "seoImage": seo.image.asset -> url,
    "globalSeoImage": *[_id == 'config_seo'][0].image.en.asset -> url
  }`);

  const useFallback = !data?.heroImage;

  if (useFallback) {
    return CoverImage(data?.seoImage || data?.globalSeoImage);
  }

  let heroImage;
  if (data?.heroImage) {
    heroImage = getResponsiveImageUrl(data?.heroImage);
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
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          {/* title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              height: "100%",
              padding: 60,
            }}
          >
            {data?.logoImage && (
              <div style={{ display: "flex", marginBottom: 40 }}>
                <img src={data?.logoImage} />
              </div>
            )}

            {data?.hero?.title && (
              <div
                style={{
                  color: "#111",
                  fontSize: 60,
                  fontWeight: 600,
                  fontFamily: "InterMedium",
                }}
              >
                {data?.hero?.title}
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
                border: "1px solid red",
              }}
            >
              <img src={heroImage} width={600} />
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "InterMedium",
          data: InterMediumfontData,
          style: "normal",
        },
      ],
    },
  );
};

export default withSentryOptional(handler);

const CoverImage = (imageURL: string) => {
  let heroImage;
  if (imageURL) {
    heroImage = getResponsiveImageUrl({
      src: imageURL,
      width: 1200,
      height: 630,
      crop: null,
      hotspot: null,
    });
  }

  if (heroImage) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            color: "white",
          }}
        >
          <img
            src={heroImage}
            style={{
              width: 1200,
              height: 630,
            }}
          />
        </div>
      ),
    );
  }
};
