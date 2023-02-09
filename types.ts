import { COLORS } from "./colors";

export const TRANSLATION_FIELDS = {
  next_slide: {
    description: "Label for next slide button.",
  },
  previous_slide: {
    description: "Label for previous slide button.",
  },
  read_more: {
    description: "Used on buttons in card grids.",
  },
  watch_video: {
    description: "Label on video play button.",
  },
};

export type TranslationFieldType = keyof typeof TRANSLATION_FIELDS;

export const ICONS = {
  "external-link": "external-link.svg",
  arrow: "arrow.svg",
  chevron: "chevron.svg",
  close: "close.svg",
  demo: "demo.svg",
  download: "download.svg",
  facebook: "facebook.svg",
  info: "info.svg",
  instagram: "instagram.svg",
  linkedin: "linkedin.svg",
  lock: "lock.svg",
  menu: "menu.svg",
  pause: "pause.svg",
  play: "play.svg",
  quote: "quote.svg",
  twitter: "twitter.svg",
  youtube: "youtube.svg",
  "map-marker": "map-marker.svg",
  "flag-uk": "flag_uk.svg",
  "flag-italy": "flag_italy.svg",
  "flag-spain": "flag_spain.svg",
};

export type IconType = keyof typeof ICONS;

export type ColorType = keyof typeof COLORS;

export const FONTS = {
  sans: "Sans",
  heading: "Heading",
  mono: "Mono",
};

export type TextElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "span"
  | "div"
  | "p"
  | "figcaption"
  | "strong"
  | "cite"
  | "blockquote";

export const HEADING_LEVELS = {
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  span: "Span",
};

export type HeadingLevelType = keyof typeof HEADING_LEVELS;
export type HeadingLevelsType = {
  [key in keyof typeof HEADING_LEVELS]: string;
};

export type ImageType = {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  caption?: string;
  crop?: {
    _type: "sanity.imageCrop";
    bottom: number;
    left: number;
    right: number;
    top: number;
  } | null;
  hotspot?: {
    _type: "sanity.imageHotspot";
    height: number;
    width: number;
    x: number;
    y: number;
  } | null;
};

export const VIDEO_PROVIDERS = {
  youtube: "Youtube",
  vimeo: "Vimeo",
  mux: "Mux",
};

export type VideoProviderType = keyof typeof VIDEO_PROVIDERS;

export type VideoType = {
  loop?: boolean;
  caption?: string;
  autoPlay?: boolean;
  provider?: VideoProviderType;
  videoId?: string;
  src?: string;
  frameless?: boolean;
};

export const SIZES = {
  none: "None",
  "2xs": "XXS",
  xs: "Extra small",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra large",
  "2xl": "2XL",
  "3xl": "3XL",
  "4xl": "4XL",
  "5xl": "5XL",
  "6xl": "6XL",
};

export type SizeType = keyof typeof SIZES;
export type SizesType = { [key in keyof typeof SIZES]: string };

export const FONT_WEIGHTS = {
  thin: "Thin",
  extralight: "Extralight",
  light: "Light",
  normal: "Normal",
  regular: "Regular",
  medium: "Medium",
  semibold: "Semibold",
  bold: "Bold",
  extrabold: "Extrabold",
  black: "Black",
};

export type FontWeightType = keyof typeof FONT_WEIGHTS;
export type FontWeightsType = { [key in keyof typeof FONT_WEIGHTS]: string };

export const ALIGNMENTS = {
  left: "Left",
  center: "Center",
  right: "Right",
  auto: "Auto",
  top: "Top",
  middle: "Middle",
  bottom: "Bottom",
  insideLeft: "Inside left",
  insideRight: "Inside right",
};

export type AlignmentType = keyof typeof ALIGNMENTS;
export type AlignmentsType = { [key in keyof typeof ALIGNMENTS]: string };

export const RATIOS = {
  auto: "Auto",
  "1/1": "Square",
  "16/9": "16/9",
  "3/2": "3/2",
  "2/1": "Flat",
  "13/8": "13/8",
  "4/3": "4/3",
  "21/9": "21/9",
  "19/27": "19/27",
};

export type RatioType = keyof typeof RATIOS;
export type RatiosType = { [key in keyof typeof RATIOS]: string };

export const STATIC_FORMS = {
  "newsletter-sign-up": "Newsletter sign up",
};

export type StaticFormType = keyof typeof STATIC_FORMS;
export type StaticFormsType = { [key in keyof typeof STATIC_FORMS]: string };

export const STATIC_FORM_OPTIONS = {};

export type StaticFormOptionType = keyof typeof STATIC_FORM_OPTIONS;
export type StaticFormOptionsType = {
  [key in keyof typeof STATIC_FORM_OPTIONS]?: string;
};

export type SuccessOrErrorMessage = { success: string } | { error: string };

export type PersonType = {
  name?: string;
  position?: string;
  description?: string;
  image?: ImageType;
};

export type GenericModuleProps = {
  _key?: string;
  [key: string]: any;
};
