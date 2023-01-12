export interface ProjectConfig {
  projectId: string;
  dataset: string;
}
export interface ClientConfig extends ProjectConfig {
  token?: string;
  useCdn?: boolean;
  withCredentials?: boolean;
  apiVersion?: string;
}

export const config: ClientConfig = {
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.SANITY_STUDIO_API_DATASET ||
    "development",
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_API_PROJECT_ID ||
    "",
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
};
