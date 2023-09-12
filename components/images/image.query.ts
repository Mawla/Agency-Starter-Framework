import groq from "groq";

export const imageQueryFields = groq`
  "src": url,
  "width": metadata.dimensions.width,
  "height": metadata.dimensions.height,
  "alt": coalesce(alt, altText),
`;

export const imageSimpleQuery = groq`
  @.image.source.asset -> {
    "hotspot": ^.image.source.hotspot,
    "crop": ^.image.source.crop,
    ${imageQueryFields}
    "caption": ^.image.caption,
    "alt": coalesce(^.image.alt, ^.image.altText, ^.image.source.asset->altText),
  }
`;

export const imageSourceQuery = groq`
  @.source.asset -> {
    "hotspot": image.hotspot,
    "crop": image.crop,
    "caption": image.caption,
    ${imageQueryFields}
    "alt": coalesce(image.alt, image.altText),
  }
`;

export const getImageQuery = (fieldName: string) => groq`
  @.${fieldName}.asset -> {
    ${imageQueryFields}
    "hotspot": ^.${fieldName}.hotspot,
    "crop": ^.${fieldName}.crop,
  }
`;

export const imageQuery = getImageQuery("image");
