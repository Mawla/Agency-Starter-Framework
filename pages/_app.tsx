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

      <div className={`${manrope.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
