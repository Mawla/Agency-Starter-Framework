import { PreviewIframe } from "./PreviewIframe";
import { DocumentInspector, DocumentInspectorContext } from "sanity";

export default {
  name: "Preview tool",
  document: {
    inspectors: (
      prev: DocumentInspector[],
      context: DocumentInspectorContext,
    ) => {
      const docSchema = context.schema.get(context.documentType);
      const documentType = context.documentType;
      const documentId = context.documentId;

      if (docSchema && true) {
        return [
          ...prev,
          {
            name: "preview-pane",
            useMenuItem: () => ({
              icon: () => "🧱",
              title: "Hello Generator!",
              showAsAction: false,
            }),
            params: {
              documentId,
              documentType,
            },
            component: PreviewIframe,
            onClose({
              params,
            }: {
              params: Record<string, string | undefined>;
            }) {
              return {
                params: {
                  ...params,
                  ["inspect"]: undefined,
                } as typeof params,
              };
            },
          },
        ];
      }
      return prev;
    },
  },
};
