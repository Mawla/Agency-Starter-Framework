import { config } from "./config";
import { createClient } from "@sanity/client";

/**
 * Set up a client without preview authorization
 */

export const notPreviewClient = createClient(config);

/**
 * Set up a preview client with serverless authentication for drafts
 */

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

/**
 * Helper function for easily switching between normal client and preview client
 */

export const getClient = (usePreview: boolean) =>
  usePreview ? previewClient : notPreviewClient;
