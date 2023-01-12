import React, { ComponentType } from "react";

export const EmbedIframe: ComponentType<any> = ({
  documentId,
  schemaType,
  options,
}: {
  documentId: string;
  schemaType: { name: string };
  options: { embedLink: string };
}) => {
  if (!options.embedLink) return null;
  return (
    <div>
      <iframe
        className="previewView"
        src={options.embedLink}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          border: 0,
        }}
      />
    </div>
  );
};
