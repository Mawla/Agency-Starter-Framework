import { createClient } from "@sanity/client";
import { useMemo } from "react";

export function useSanityClient(isPreviewMode = false) {
  const config = {
    projectId: "7gasrur1",
    dataset: "development",
    apiVersion: "2022-12-15",
    useCdn: true,
    token: "",
  };
  if (isPreviewMode) {
    config.useCdn = false;
    config.token = process.env.SANITY_API_READ_TOKEN || "";
  }
  const client = createClient(config);
  return useMemo(() => client, [client]);
}
