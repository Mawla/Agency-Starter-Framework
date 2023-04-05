import { config as sanityConfig } from "../../helpers/sanity/config";
import { withSentryOptional } from "../../helpers/sentry/with-sentry-optional";
import imageUrlBuilder from "@sanity/image-url";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

const builder = imageUrlBuilder(sanityConfig);

export const config = {
  runtime: "experimental-edge",
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

  let id = searchParams.get("id");
  if (!id) id = "page_homepage__i18n_en";

  const page = await sanityClient.fetch(`*[_id == "${id}"][0] {
    "hero": blocks[0] {
      eyebrow,
      title,
      text,
      image
    }
  }`);

  let imageURL;
  if (page?.hero?.image) {
    let image = builder
      .image(page?.hero?.image)
      .width(1200)
      .height(630)
      .fit("crop");

    try {
      imageURL = image?.url();
    } catch (err) {
      console.log(err);
    }
  }

  if (page?.seoImage) {
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
            src={`${page?.seoImage}?w=1200&h=630&fit=crop`}
            style={{
              width: 1200,
              height: 630,
            }}
          />
        </div>
      ),
    );
  }

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
        {imageURL && (
          <img
            src={imageURL}
            style={{
              position: "absolute",
              inset: 0,
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
          }}
        >
          {page?.hero?.eyebrow && (
            <div style={{ color: "black", fontSize: 40 }}>
              {page?.hero?.eyebrow}
            </div>
          )}

          {page?.hero?.title && (
            <div style={{ color: "black", fontSize: 80 }}>
              {page?.hero?.title}
            </div>
          )}
        </div>
      </div>
    ),
  );
};

export default withSentryOptional(handler);
