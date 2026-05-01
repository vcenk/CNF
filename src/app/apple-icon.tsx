import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  // Try to embed the wordmark logo. Falls back to FN monogram if fetch fails.
  let logoDataUrl: string | null = null;
  try {
    const logoResponse = await fetch(`${siteConfig.url}/FormulaNorth_Logo.png`);
    if (logoResponse.ok) {
      const buffer = await logoResponse.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      logoDataUrl = `data:image/png;base64,${base64}`;
    }
  } catch {
    // ignore
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fffaf1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        {logoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoDataUrl}
            alt={siteConfig.name}
            width={160}
            height={120}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div
            style={{
              color: "#0d6c63",
              fontSize: "92px",
              fontWeight: 700,
              fontFamily: "Georgia, serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: "-0.04em",
            }}
          >
            FN
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
