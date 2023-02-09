import React, { ComponentType, useEffect, useState } from "react";
import { useClient } from "sanity";

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
  const client = useClient({ apiVersion: "vX" });
  const [secret, setSecret] = useState<string | null>(null);

  useEffect(() => {
    async function getSecret() {
      const secret = await client.fetch(
        `*[_id == "secret.config_cms"][0].previewSecret`,
      );
      setSecret(secret);
    }
    getSecret();
  }, []);

  if (!secret) return null;

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

      <iframe
        src={`${
          import.meta.env.SANITY_STUDIO_PROJECT_PATH
        }api/preview/preview?_id=${_id}&_type=${_type}&secret=${secret}&language=${language}`}
      />
    </div>
  );
};

const PreviewIframeComponentMemo = React.memo(PreviewIframeComponent);
