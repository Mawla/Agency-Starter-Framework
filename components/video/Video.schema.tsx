import { prefixWithLanguage } from "../../studio/utils/language/prefix-with-language";
import { VIDEO_PROVIDERS } from "../../types";
import getYoutubeId from "get-youtube-id";
import React from "react";
import { ConditionalPropertyCallback, defineType, defineField } from "sanity";

export const getVideoPreview = (prefix = "") => ({
  select: {
    caption: `${prefix}caption`,
    provider: `${prefix}provider`,
    youtube: `${prefix}youtube`,
    video: `${prefix}video`,
    muxPlaybackId: `${prefix}mux.asset.playbackId`,
    vimeo: `${prefix}vimeo`,
    language: "language",
  },
  prepare({ caption, youtube, vimeo, muxPlaybackId, language }: any) {
    const videoThumbnail = getVideoPreviewThumbnail({
      muxPlaybackId,
      youtube,
    });
    const videoTitle = getVideoPreviewTitle({
      caption,
      youtube,
      vimeo,
      muxPlaybackId,
    });

    return {
      title: videoTitle,
      subtitle: prefixWithLanguage(language),
      media: videoThumbnail ? <img src={videoThumbnail} alt="" /> : null,
    };
  },
});

export const getVideoPreviewTitle = ({
  caption,
  youtube,
  vimeo,
  muxPlaybackId,
}: any) => {
  return `${[youtube, vimeo, muxPlaybackId ? "mux video" : null]
    .filter(Boolean)
    .join(", ")}${caption ? ` - ${caption}` : ""}`;
};

export const getVideoPreviewThumbnail = ({ muxPlaybackId, youtube }: any) => {
  let image = null;

  if (muxPlaybackId)
    image = `https://image.mux.com/${muxPlaybackId}/thumbnail.jpg?&fit_mode=smartcrop&width=160&height=160`;

  if (youtube)
    image = `https://img.youtube.com/vi/${getYoutubeId(youtube)}/0.jpg`;

  /**
   * vimeo needs a json request first,
   * but that's not possible until we have
   * async prepare in sanity https://github.com/sanity-io/sanity/issues/2955
   */
  return image;
};

const schema = defineType({
  name: "video",
  title: "Video",
  type: "object",
  initialValue: {
    loop: false,
    autoPlay: false,
  },
  preview: getVideoPreview(),
  fieldsets: [
    {
      name: "videoOptions",
      title: "Video options",
      options: { collapsed: true, collapsible: true },
    },
  ],
  fields: [
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      options: {
        list: Object.keys(VIDEO_PROVIDERS),
      },
    }),
    defineField({
      title: "Sanity",
      type: "file",
      name: "sanity",
      description:
        "Hosting videos on Sanity itself is discouraged. The video can't be optimised by the frontend and hosting costs will increase. Choosing a dedicated video provider like Youtube, Vimeo, Mux or Cloudinary is encouraged.",
      hidden: (({ parent, value }) =>
        !value && parent?.provider !== "sanity") as ConditionalPropertyCallback,
    }),

    defineField({
      title: "Youtube URL",
      type: "url",
      name: "youtube",
      description:
        "Link of the Youtube video, e.g https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      hidden: (({ parent, value }) =>
        !value &&
        parent?.provider !== "youtube") as ConditionalPropertyCallback,
    }),
    defineField({
      title: "Vimeo URL",
      type: "url",
      name: "vimeo",
      description: "Link of the Vimeo video, e.g https://vimeo.com/1084537",
      hidden: (({ parent, value }) =>
        !value && parent?.provider !== "vimeo") as ConditionalPropertyCallback,
    }),
    defineField({
      title: "Mux",
      type: "mux.video",
      name: "mux",
      description: "Mux video ID",
      hidden: (({ parent, value }) =>
        !value && parent?.provider !== "mux") as ConditionalPropertyCallback,
    }),
    defineField({
      name: "loop",
      title: "Loop",
      type: "boolean",
      fieldset: "videoOptions",
      description: "Replay the video when it ends.",
    }),
    defineField({
      name: "autoPlay",
      title: "Auto play",
      type: "boolean",
      fieldset: "videoOptions",
      description: "Start playing the video automatically.",
    }),
    defineField({
      name: "frameless",
      title: "Frameless",
      type: "boolean",
      fieldset: "videoOptions",
      description:
        "Remove controls from video. This may not work very well with Youtube or Vimeo.",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description:
        "Optional caption to display with the video. Only shown on the website when layout allows for it.",
    }),
  ],
});

export default schema;
