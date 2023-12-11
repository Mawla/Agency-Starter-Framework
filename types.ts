import { pick } from "./helpers/utils/object";
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS } from "./theme";

export const TRANSLATION_FIELDS = {
  next_slide: "Label for next slide button.",
  previous_slide: "Label for previous slide button.",
  read_more: "Used on buttons in card grids.",
  watch_video: "Label on video play button.",
  load_more: "Load more label for pagination.",
  blog: "Label for blog article.",
  event: "Label for event article.",
  casestudy: "Label for casestudy article.",
  podcast: "Label for podcast article.",
  guide: "Label for guide article.",
  tool: "Label for tool article.",
  video: "Label for video article.",
  newsarticle: "Label for newsarticle article.",
  mediacoveragearticle: "Label for mediacoveragearticle article.",
  pressrelease: "Label for pressrelease article.",
  related_resources: "Label for related article sidebar.",
  open: "Label for opening a dropdown.",
};

export type TranslationFieldType = keyof typeof TRANSLATION_FIELDS;

export const PREDEFINED_ICONS = {
  arrow: {
    title: "Arrow",
    description: "Used in buttons",
  },
  check: {
    title: "Check",
    description: "Used in check lists",
  },
  chevrondown: {
    title: "Chevron down",
    description: "Used in dropdowns, accordions",
  },
  close: {
    title: "Close",
    description: "Used to close modals",
  },
  externallink: {
    title: "External link",
    description: "Used for external links",
  },
  lock: {
    title: "Lock",
    description: "Used for password protected pages",
  },
  menu: {
    title: "Menu",
    description: "Used to open the mobile menu",
  },
  globe: {
    title: "Globe",
    description: "Shown next to the language selector",
  },
  home: {
    title: "Home",
    description: "Shown in the breadcrumb",
  },
  facebook: {
    title: "Facebook",
    description: "Shown on the article page share buttons",
  },
  twitter: {
    title: "Twitter",
    description: "Shown on the article page share buttons",
  },
  linkedin: {
    title: "LinkedIn",
    description: "Shown on the article page share buttons",
  },
  clipboard: {
    title: "Clipboard",
    description: "Shown on the article page share buttons",
  },
  yes: {
    title: "Yes",
    description: "Icon to show in the pricing comparison table for yes values",
  },
  no: {
    title: "No",
    description: "Icon to show in the pricing comparison table for no values",
  },
  tooltip: {
    title: "Tooltip",
    description: "Icon to display a tooltip in the pricing comparison table",
  },
};

export type PredefinedIconType = keyof typeof PREDEFINED_ICONS;

export type ColorType = keyof typeof COLORS;
export type FontWeightType = keyof typeof FONT_WEIGHTS;
export type FontType = keyof typeof FONTS;
export type FontSizeType = keyof typeof FONT_SIZES;

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

export const HTML_TEXT_NODES = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  span: "Span",
  div: "Div",
};

export const BORDER_RADIUS_OPTIONS = {
  none: "none",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  "3xl": "3xl",
  full: "full",
};
export type BorderRadiusType = keyof typeof BORDER_RADIUS_OPTIONS;

export const BORDER_WIDTH_OPTIONS = {
  0: "0px",
  1: "1px",
  2: "2px",
  4: "4px",
  8: "8px",
};
export type BorderWidthType = keyof typeof BORDER_WIDTH_OPTIONS;

export const TEXT_TRANSFORM_OPTIONS = {
  uppercase: "UPPERCASE",
  lowercase: "lowercase",
  capitalize: "Capitalize",
};
export type TextTransformType = keyof typeof TEXT_TRANSFORM_OPTIONS;

export const PADDING_OPTIONS = {
  "0": "0px",
  px: "1px",
  "0.5": "2px",
  "1": "4px",
  "1.5": "6px",
  "2": "8px",
  "2.5": "10px",
  "3": "12px",
  "3.5": "14px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "7": "28px",
  "8": "32px",
  "9": "36px",
  "10": "40px",
  "11": "44px",
  "12": "48px",
  "14": "56px",
  "16": "64px",
  "20": "80px",
  "24": "96px",
  "28": "112px",
  "32": "128px",
  "36": "144px",
  "40": "160px",
  "44": "176px",
  "48": "192px",
  "52": "208px",
  "56": "224px",
  "60": "240px",
  "64": "256px",
  "72": "288px",
  "80": "320px",
  "96": "384px",
};
export type PaddingType = keyof typeof PADDING_OPTIONS;

export type HtmlTextNodeType = keyof typeof HTML_TEXT_NODES;

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
  priority?: boolean;
};

export const VIDEO_PROVIDERS = {
  youtube: "Youtube",
  vimeo: "Vimeo",
  mux: "Mux",
  sanity: "Sanity",
  url: "URL",
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
  priority?: boolean;
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

export const HORIZONTAL_ALIGN_OPTIONS = pick(
  ALIGNMENTS,
  "left",
  "center",
  "right",
);
export type HorizontalAlignType = keyof typeof HORIZONTAL_ALIGN_OPTIONS;

export const VERTICAL_ALIGN_OPTIONS = pick(
  ALIGNMENTS,
  "top",
  "middle",
  "bottom",
);
export type VerticalAlignType = keyof typeof VERTICAL_ALIGN_OPTIONS;

export const RATIOS = {
  auto: "Auto",
  "1/1": "Square",
  "16/9": "16/9",
  "9/16": "9/16",
  "3/2": "3/2",
  "2/3": "2/3",
  "2/1": "2/1",
  "1/2": "1/2",
  "4/3": "4/3",
  "3/4": "3/4",
  "21/9": "21/9",
  "9/21": "9/21",
};

export type RatioType = keyof typeof RATIOS;
export type RatiosType = { [key in keyof typeof RATIOS]: string };

export type PersonType = {
  name?: string;
  position?: string;
  description?: string;
  image?: ImageType;
};

export type GenericBlockProps = {
  _key: string;
  [key: string]: any;
};

export type BlockPreviewToolAction =
  | "block-edit"
  | "block-delete"
  | "block-duplicate"
  | "block-move-down"
  | "block-move-up"
  | "block-add-after";

export type ComponentPreviewToolAction = "component-edit" | "component-delete";
