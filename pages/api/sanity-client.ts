import { config } from "../../helpers/sanity/config";
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
