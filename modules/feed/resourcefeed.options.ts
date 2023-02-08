import { SIZE_OPTIONS } from "../../components/module/Title";
import { pick } from "../../helpers/utils/object";
import { LINKABLE_SCHEMAS } from "../../types.sanity";

export const TITLE_SIZE_OPTIONS = pick(SIZE_OPTIONS, "xl", "2xl", "3xl");
export type TitleSizeType = keyof typeof TITLE_SIZE_OPTIONS;

export const RESOURCE_FEED_FILTER_OPTIONS = pick(
  LINKABLE_SCHEMAS,
  "page.blog",
  "page.event",
  "page.casestudy",
  "page.podcast",
  "page.tool",
  "page.video",
  "page.guide",
);
export type ResourceFeedFilterType = keyof typeof RESOURCE_FEED_FILTER_OPTIONS;
