import groq from "groq";

export const imageQueryFields = groq`
  "src": url,
  "width": metadata.dimensions.width,
  "height": metadata.dimensions.height,
  alt,
`;

export const imageSimpleQuery = groq`
  @.image.source.asset -> {
    "preventResize": ^.image.preventResize,
    "hotspot": ^.image.source.hotspot,
    "crop": ^.image.source.crop,
    ${imageQueryFields}
    "caption": ^.image.caption,
    "alt": ^.image.alt,
  }
`;

export const imageSourceQuery = groq`
  @.source.asset -> {
    "preventResize": image.preventResize,
    "hotspot": image.hotspot,
    "crop": image.crop,
    "caption": image.caption,
    ${imageQueryFields}
    "alt": image.alt,
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
