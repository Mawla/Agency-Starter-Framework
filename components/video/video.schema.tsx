import { UnsetObjectButton } from "../../studio/components/UnsetObjectButton";
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
    sanity: `${prefix}sanity.asset.url`,
  },
  prepare({ caption, youtube, vimeo, muxPlaybackId, sanity }: any) {
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

export const getVideoPreviewThumbnail = ({
  muxPlaybackId,
  youtube,
  vimeo,
}: any) => {
  let image = null;

  if (muxPlaybackId)
    image = `https://image.mux.com/${muxPlaybackId}/thumbnail.png?width=400&height=200&fit_mode=smartcrop&time=35`;

  if (youtube)
    image = `https://img.youtube.com/vi/${getYoutubeId(youtube)}/0.jpg`;

  /**
   * vimeo needs a json request first,
   * but that's not possible until we have
   * async prepare in sanity https://github.com/sanity-io/sanity/issues/2955
   */
  return image;
};

const VideoPreview = (props: any) => {
  return (
    <div
      style={{
        background: "rgba(0,0,0,.85)",
        color: "white",
        width: "100%",
        aspectRatio: "16/9",
        textAlign: "center",
        fontSize: 12,
      }}
    >
      {props?.media?.props?.src && (
        <img src={`${props?.media?.props?.src}`} style={{ width: "100%" }} />
      )}
      <svg
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      {props.title && (
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "10px",
            transform: "translateX(-50%)",
          }}
        >
          {props.title}
        </span>
      )}
    </div>
  );
};

const schema = defineType({
  name: "video",
  title: "Video",
  type: "object",
  preview: getVideoPreview(),
  components: {
    preview: VideoPreview,
    field: UnsetObjectButton,
  },
  options: {
    collapsed: false,
    collapsible: false,
  },
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
      title: "CMS",
      type: "file",
      name: "sanity",
      options: {
        accept: "video/*",
      },
      description: "Video in Sanity",
      hidden: (({ parent, value }) =>
        !value && parent?.provider !== "sanity") as ConditionalPropertyCallback,
    }),
    defineField({
      title: "URL",
      type: "url",
      name: "url",
      description:
        "Link to an external file (typically mp4 or webm), e.g https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4",
      hidden: ({ parent, value }) => !value && parent?.provider !== "url",
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
