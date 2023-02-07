import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

const shouldEnableMarker = () =>
  process.env.NEXT_PUBLIC_SANITY_DATASET === "client-staging";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#003e56"
          />
          <meta name="msapplication-TileColor" content="#003e56" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="google-site-verification" content="" />

          <link
            rel="preconnect"
            href="https://cdn.sanity.io/"
            crossOrigin="crossOrigin"
          />

          <link
            rel="preload"
            href="/icons/menu.svg"
            as="image"
            media="(max-width: 1024px)"
          />
          <link
            rel="preload"
            href="/icons/chevron.svg"
            as="image"
            media="(max-width: 1024px)"
          />

          {/* {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
            <>
              <link rel="preconnect" href="https://www.google-analytics.com" />
              <link rel="preconnect" href="https://www.googletagmanager.com" />
              <link rel="preconnect" href="https://consent.cookiebot.com" />
              <link
                rel="preload"
                href="https://cookie-cdn.cookiepro.com/scripttemplates/6.27.0/otBannerSdk.js"
                as="script"
              />
            </>
          )}
          {shouldEnableMarker() && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.markerConfig = { destination: '6194cb5ce8a98103607e6fb0' };`,
              }}
            />
          )}
          {shouldEnableMarker() && (
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);`,
              }}
            />
          )} */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
