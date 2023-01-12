import React from "react";

export const PreviewIframe = ({ documentId, schemaType, options }) => {
  const draftId = documentId.startsWith("drafts.")
    ? documentId
    : `drafts.${documentId}`;
  return (
    <PreviewIframeComponentMemo
      _id={draftId}
      _type={schemaType.name}
      language={options.language}
    />
  );
};

export const PreviewIframeComponent = ({ _id, _type, language }) => {
  const url = `${process.env.SANITY_STUDIO_PROJECT_PATH}api/preview/preview?_id=${_id}&_type=${_type}&secret=${process.env.SANITY_STUDIO_PREVIEW_SECRET}&language=${language}`;
  return (
    <div className="previewView">
      <style>{`
        .previewView {
          width: 100%;
          height: 100%;
        }

        .previewView iframe {
          border: 0;
          height: 100%;
          width: 100%;
        }
      `}</style>

      <iframe src={url} />
    </div>
  );
};

const PreviewIframeComponentMemo = React.memo(PreviewIframeComponent);
