import client from '@sanity/client';

import { config } from '../../helpers/sanity/config';

export const sanityClient = client({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
