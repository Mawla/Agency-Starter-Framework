import React, { ComponentType } from "react";

export const PreviewIframe: ComponentType<any> = ({
  documentId,
  schemaType,
  options,
}: {
  documentId: string;
  schemaType: { name: string };
  options: { language: string };
}) => {
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

export const PreviewIframeComponent = ({
  _id,
  _type,
  language,
}: {
  _id: string;
  _type: string;
  language: string;
}) => {
  const url = `${
    (import.meta as any).env.SANITY_STUDIO_PROJECT_PATH
  }api/preview/preview?_id=${_id}&_type=${_type}&secret=${
    (import.meta as any).env.SANITY_STUDIO_PREVIEW_SECRET
  }&language=${language}`;
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
