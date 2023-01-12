import "../styles/plyr-custom.css";
import "../styles/plyr.css";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="5664cec0-2a5d-458a-957b-9f6c25ad5f33"
        data-blockingmode="auto"
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
