import sanityClient from '@sanity/client';

import { config } from './config';

/**
 * Set up a client without preview authorization
 */

export const notPreviewClient = sanityClient(config);

/**
 * Set up a preview client with serverless authentication for drafts
 */

export const previewClient = sanityClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

/**
 * Helper function for easily switching between normal client and preview client
 */

export const getClient = (usePreview: boolean) =>
  usePreview ? previewClient : notPreviewClient;
