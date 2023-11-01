import { config } from "./config";
import { createClient } from "next-sanity";

export const getClient = () => {
  return config.projectId && config.dataset
    ? createClient(config)
    : {
        fetch: async (query: string) => null,
      };
};
