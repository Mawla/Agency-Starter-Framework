import { COLORS } from "./colors";
import { LanguageType } from "./languages";
import { SitemapType } from "./queries/sitemap";
import { ModuleSchemaName } from "./types.sanity";

export const TRANSLATION_FIELDS = {
  all_departments: {
    description:
      "Label for option to show all departments in the job finder filter dropdown.",
  },
  all_office_locations: {
    description:
      "Label for option to show all offices in the job finder filter dropdown.",
  },
  all_countries: {
    description: "Label for button to select all countries in the job finder.",
  },
  department: {
    description: "Default select label in the job finder departments filter.",
  },
  full_remote: {
    description: "Label in job listing for remote jobs.",
  },
  next_slide: {
    description: "Label for next slide button.",
  },
  no_jobs_found: {
    description: "Text shown when the job finder returns no results.",
  },
  office_location: {
    description: "Default select label in the job finder offices filter.",
  },
  positions_in: {
    description:
      "Label for country selector in job finder, e.g positions in [Italy].",
  },
  previous_slide: {
    description: "Label for previous slide button.",
  },
  read_more: {
    description: "Used on buttons in card grids.",
  },
  remote: {
    description: "Label shown on the job detail page for remote jobs.",
  },
  watch_video: {
    description: "Label on video play button.",
  },
};

export type TranslationFieldType = keyof typeof TRANSLATION_FIELDS;

export const ICONS = {
  "external-link": "external-link.svg",
  "magnifying-glass": "magnifying-glass.svg",
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
  remote: "remote.svg",
  trash: "trash.svg",
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

export type ImageType = {
  src: string;
  preventResize?: boolean;
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
  cloudinary: "Cloudinary",
  mux: "Mux",
  sanity: "Sanity",
  static: "Static",
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
  poster?: ImageType;
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
};

export type SizeType = keyof typeof SIZES;
export type SizesType = { [key in keyof typeof SIZES]: string };

export const FONT_WEIGHTS = {
  light: "Light",
  book: "Book",
  bold: "bold",
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
  contact: "Contact",
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
