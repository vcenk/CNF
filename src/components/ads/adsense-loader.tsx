"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT, isAdSenseContentPath } from "@/lib/adsense";

export function AdSenseLoader() {
  const pathname = usePathname();

  if (!isAdSenseContentPath(pathname)) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
