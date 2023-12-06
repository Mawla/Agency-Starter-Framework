import { SANITY_API_VERSION } from "../../types.sanity";
import { LaunchIcon, OverageIcon } from "@sanity/icons";
import { Spinner } from "@sanity/ui";
import { useEffect, useState } from "react";
import React from "react";
import { PluginOptions, useClient } from "sanity";
import { useRouterState } from "sanity/router";

export const productionURLPane: PluginOptions = {
  name: "Production URL pane",
  document: {
    inspectors: (prev, context) => {
      const docSchema = context.schema.get(context.documentType);
      if (docSchema && context.documentType.startsWith("page.")) {
        return [
          ...prev,
          {
            name: "open-production-url",
            useMenuItem: () => ({
              icon: PreviewIcon,
              title: "View published version on website",
              showAsAction: true,
            }),
            component: PreviewPane,
          },
        ];
      }
      return prev;
    },
  },
};

/**
 * Display the icon in the menu
 */

const PreviewIcon = () => {
  const client = useClient({
    apiVersion: SANITY_API_VERSION,
  });

  const [state, setState] = useState<"loading" | "notpublished" | "published">(
    "loading",
  );

  const routerState = useRouterState() as any;
  const documentId =
    routerState?.panes?.[routerState?.panes?.length - 1]?.[0]?.id;

  if (!documentId) return null;

  useEffect(() => {
    async function getPublished() {
      const yesno = await client.fetch(
        `count(*[_id == "${documentId.replace("drafts.", "")}"]) > 0`,
      );

      setState(yesno ? "published" : "notpublished");
    }
    getPublished();
  }, [documentId]);

  if (state === "loading") return <Spinner />;
  if (state === "published") return <LaunchIcon />;
  if (state === "notpublished") return <OverageIcon />;
};

/**
 * Opening and closing a panel here to open the product URL
 * bit of a hack, but it works.
 * Perhaps later replace this when Sanity allows button only menu items
 */

const PreviewPane = ({
  onClose,
  documentId,
}: {
  onClose: () => void;
  documentId: string;
  documentType: string;
}) => {
  const client = useClient({
    apiVersion: SANITY_API_VERSION,
  });

  useEffect(() => {
    async function getPath() {
      if (location.pathname.includes("open-production-url")) return onClose();

      const hasPublishedVersion = await client.fetch(
        `count(*[_id == "${documentId.replace("drafts.", "")}"]) > 0`,
      );

      if (!hasPublishedVersion) return onClose();

      const path = `${
        import.meta.env.SANITY_STUDIO_PROJECT_PATH
      }api/preview/open-production-url?id=${documentId.replace(
        /^drafts\./,
        "",
      )}`;

      window.open(path, "_blank");
      onClose();
    }

    getPath();
  }, [documentId, onClose]);

  return null;
};
