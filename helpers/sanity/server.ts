import { config } from "./config";
import { createClient } from "@sanity/client";

export const getClient = () => {
  return config.projectId && config.dataset
    ? createClient(config)
    : {
        fetch: async (query: string) => null,
      };
};
