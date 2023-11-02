import { baseLanguage } from "../../languages";
import { SANITY_API_VERSION } from "../../types.sanity";
import { getStructurePath } from "../utils/desk/get-structure-path";
import { Card, Text, Spinner } from "@sanity/ui";
import IframeResizer from "iframe-resizer-react";
import React, { ComponentType, useEffect, useState } from "react";
import { useClient, useFormValue } from "sanity";

export const PreviewIframe: ComponentType<any> = ({
  documentId,
  schemaType,
}: {
  documentId: string;
  schemaType: { name: string };
  options: { language: string };
}) => <PreviewIframeComponentMemo _id={documentId} _type={schemaType.name} />;

export const PreviewIframeComponent = ({
  _id,
  _type,
}: {
  _id: string;
  _type: string;
}) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const [secret, setSecret] = useState<string | null>();
  const [state, setState] = useState<"loading" | "complete">("loading");

  useEffect(() => {
    async function getSecret() {
      const secret = await client.fetch(
        `*[_id == "secret.config_cms"][0].previewSecret`,
      );
      setSecret(secret);
      setState("complete");
    }
    getSecret();
  }, []);

  if (state === "loading") {
    return (
      <Card
        padding={[3, 3, 4]}
        style={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <Spinner />
      </Card>
    );
  }

  if (!secret)
    return (
      <Card padding={[3, 3, 4]} radius={2} shadow={1} tone="caution">
        <Text align="center" size={1}>
          Create a preview secret in the{" "}
          <a href="/cms/desk/config;secret.config_cms">secret config</a>{" "}
          document to enable previews.
        </Text>
      </Card>
    );

  const src = `${
    import.meta.env.SANITY_STUDIO_PROJECT_PATH
  }api/preview/open-preview?_id=${_id}&_type=${_type}&secret=${secret}&language=${
    getStructurePath()?.language || baseLanguage
  }`;

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

      {_type.startsWith("page.") ? (
        <iframe src={src} />
      ) : (
        <IframeResizer src={src} />
      )}
    </div>
  );
};

const PreviewIframeComponentMemo = React.memo(PreviewIframeComponent);

export const PreviewIframeInline = () => {
  const document = useFormValue([]) as {
    _id?: string;
    _type: string;
    [key: string]: any;
  };

  if (!document?._id) return null;

  return (
    <div style={{ overflow: "scroll", resize: "vertical" }}>
      <div style={{ width: 1280 }}>
        <PreviewIframeComponentMemo _id={document._id} _type={document._type} />
      </div>
    </div>
  );
};
