import config from "../engine.config";
import "../public/engine.styles.css";
import "../styles/styles.css";
// @ts-ignore
import { GoogleTagManager } from "@next/third-parties/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />
      {config?.gtmid && process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
        <GoogleTagManager gtmId={config.gtmid} />
      )}
    </QueryClientProvider>
  );
}

export default MyApp;
