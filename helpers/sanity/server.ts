import { config } from "./config";
import { createClient } from "@sanity/client";

/**
 * Set up a client without preview authorization
 */

const mockClient = {
  fetch: async (query: string) => null,
};

export const notPreviewClient =
  config.projectId && config.dataset ? createClient(config) : mockClient;

/**
 * Set up a preview client with serverless authentication for drafts
 */

export const previewClient =
  config.projectId && config.dataset
    ? createClient({
        ...config,
        useCdn: false,
        token: process.env.SANITY_API_READ_TOKEN,
      })
    : mockClient;

/**
 * Helper function for easily switching between normal client and preview client
 */

export const getClient = (usePreview: boolean) => {
  return usePreview ? previewClient : notPreviewClient;
};
