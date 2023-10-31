import { config } from "./config";
import { createClient } from "@sanity/client";

/**
 * Set up a client without preview authorization
 */

const mockClient = {
  fetch: async (query: string) => null,
};

/**
 * Helper function for easily switching between normal client and preview client
 */

export const getClient = () => {
  return config.projectId && config.dataset ? createClient(config) : mockClient;
};
