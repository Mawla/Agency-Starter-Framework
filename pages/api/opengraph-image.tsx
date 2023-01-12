import { config as sanityConfig } from "../../helpers/sanity/config";
import { getImageQuery } from "../../queries/components/image";
import imageUrlBuilder from "@sanity/image-url";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

const builder = imageUrlBuilder(sanityConfig);

export const config = {
  runtime: "experimental-edge",
};

// const fontBold = fetch(
//   new URL("../../public/fonts/CircularXXSub-Bold.woff", import.meta.url)
// ).then((res) => res.arrayBuffer());

// const fontBook = fetch(
//   new URL("../../public/fonts/CircularXXSub-Book.woff", import.meta.url)
// ).then((res) => res.arrayBuffer());

const PicoSanity = require("picosanity");

const sanityClient = new PicoSanity({
  dataset: process.env.SANITY_STUDIO_API_DATASET || "development",
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || "",
  apiVersion: "2021-03-25",
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: process.env.NODE_ENV === "production",
});

export default async function handler(req: NextRequest) {
  // const fontBoldData = await fontBold;
  // const fontBookData = await fontBook;

  const { searchParams } = new URL(req.url);

  let id = searchParams.get("id");
  if (!id) id = "page_homepage";

  const language = searchParams.get("language") || "en";

  const page = await sanityClient.fetch(`*[_id == "${id}"][0] {
    "seoImage": seo.${language}.image.asset -> url,
    "hero": hero[language == "${language}"][0] {
      eyebrow,
      title,
      text,
      visual {
        "image1": ${getImageQuery("image1")},
        "image2": ${getImageQuery("image2")},
        colors
      },
    },
    "fallback": *[_id == 'config_seo'][0] {
      "title": title.${language},
      "description": description.${language},
      "image": ${getImageQuery(`image.${language}`)}
    }
  }`);

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
            fontFamily: '"CircularXXSub-Bold"',
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
      )
    );
  }

  let image1URL;
  if (page?.hero?.visual?.image1 || page?.fallback?.image) {
    let image1 = builder
      .image(page?.hero?.visual?.image1?.src || page?.fallback?.image)
      .width(400)
      .height(800)
      .fit("crop");

    if (page?.hero?.visual?.image1?.hotspot) {
      image1 = image1
        .crop("focalpoint")
        .focalPoint(
          page?.hero?.visual?.image1?.hotspot?.x,
          page?.hero?.visual?.image1?.hotspot?.y
        );
    }

    try {
      image1URL = image1?.url();
    } catch (err) {}
  }

  let image2URL;
  if (page?.hero?.visual?.image2) {
    let image2 = builder
      .image(page?.hero?.visual?.image2?.src)
      .width(400)
      .height(800)
      .fit("crop");

    if (page?.hero?.visual?.image2?.hotspot) {
      image2 = image2
        .crop("focalpoint")
        .focalPoint(
          page?.hero?.visual?.image2?.hotspot?.x,
          page?.hero?.visual?.image2?.hotspot?.y
        );
    }

    try {
      image2URL = image2?.url();
    } catch (err) {}
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
          fontFamily: '"CircularXXSub-Bold"',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "60%",
            flexShrink: 0,
            height: "100%",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              borderRadius: "26px",
              width: "52px",
              height: "92px",
              backgroundColor: "#f3f4f4",
              transform: "rotate(30deg)",
              marginBottom: "20px",
            }}
          />
          <div
            style={{
              fontSize: "32px",
              color: "#8334c2",
              display: "flex",
              marginBottom: "10px",
            }}
          >
            {page?.hero?.eyebrow || page?.fallback?.title}
          </div>
          <div
            style={{
              fontSize: "64px",
              color: "#21283b",
              marginBottom: "0px",
            }}
          >
            {page?.hero?.title || page?.fallback?.description}
          </div>

          <img
            src="https://development-helloprima.vercel.app/logo.svg"
            style={{
              display: "flex",
              transform: "translateY(60px)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "40%",
            flexShrink: 0,
            height: "100%",
          }}
        >
          <img
            src="https://development-helloprima.vercel.app/decorations/one-brand-base.svg"
            style={{
              transform: "rotate(12deg) translateX(-15%) translateY(11%)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            width: "400px",
            flexShrink: 0,
            height: "400px",
            position: "absolute",
            transform: "translateY(100%) translateX(50%)",
          }}
        >
          <div
            style={{
              display: "flex",
              borderRadius: "26px",
              width: "52px",
              height: "92px",
              backgroundColor: "#e5f1f4",
              transform: "rotate(-30deg) translateX(80px)",
              marginBottom: "20px",
              position: "absolute",
            }}
          />
          {image1URL && (
            <div
              style={{
                display: "flex",
                width: "202px",
                flexShrink: 0,
                height: "400px",
              }}
            >
              <img
                src={image1URL}
                style={{
                  width: "202px",
                  height: "400px",
                  borderRadius: "100px",
                  transform: "rotate(12deg) translateX(299px) translateY(-35%)",
                }}
              />
            </div>
          )}
          {image2URL && (
            <div
              style={{
                display: "flex",
                width: "200px",
                flexShrink: 0,
                height: "400px",
              }}
            >
              <img
                src={image2URL}
                style={{
                  width: "200px",
                  height: "400px",
                  borderRadius: "100px",
                  transform:
                    "rotate(-12deg) translateY(-136%) translateX(-22%)",
                }}
              />
            </div>
          )}
        </div>
      </div>
      // {
      //   width: 1200,
      //   height: 630,
      //   fonts: [
      //     {
      //       name: "CircularXXSub-Bold",
      //       data: fontBoldData,
      //       style: "normal",
      //     },
      //     {
      //       name: "CircularXXSub-Book",
      //       data: fontBookData,
      //       style: "normal",
      //     },
      //   ],
      // }
    )
  );
}
