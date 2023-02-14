import "../styles/styles.css";
import { Manrope } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";

const queryClient = new QueryClient();

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* {process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && (
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="5664cec0-2a5d-458a-957b-9f6c25ad5f33"
          data-blockingmode="auto"
        />
      )} */}

      <main className={`${manrope.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}

export default MyApp;
