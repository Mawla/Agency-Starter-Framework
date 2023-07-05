import { Card, Text, Spinner } from "@sanity/ui";
import React, { ComponentType, useEffect, useState } from "react";
import { useClient } from "sanity";

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
  const client = useClient({ apiVersion: "vX" });
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
          <a href="/desk/config;secret.config_cms">secret config</a> document to
          enable previews.
        </Text>
      </Card>
    );

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
        }api/preview/preview?_id=${_id}&_type=${_type}&secret=${secret}`}
      />
    </div>
  );
};

const PreviewIframeComponentMemo = React.memo(PreviewIframeComponent);
