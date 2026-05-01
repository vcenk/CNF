import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide default Open Graph image (1200x630).
 *
 * Design constraints — social platforms crop aggressively:
 *   - Facebook desktop card: shows full 1.91:1 (close to native 1200x630)
 *   - Facebook mobile / Messenger card: often a square crop from the center
 *   - Twitter "summary_large_image": 1200x600 (close to native)
 *   - Twitter "summary": 144x144 square crop from the center
 *   - LinkedIn: 1200x627 (close to native)
 *   - WhatsApp / iMessage: square crop
 *   - Slack / Discord: full image, but small height
 *
 * To survive every crop, all key content (logo + tagline + URL) must
 * sit inside the centered "safe zone" — roughly the central 800x500
 * region. Edges are decorative only.
 *
 * If the logo image fetch fails (rare, only on local dev without the
 * site URL set), we fall back to an FN monogram + text wordmark.
 */
export default async function OpenGraphImage() {
  let logoDataUrl: string | null = null;
  try {
    const logoResponse = await fetch(`${siteConfig.url}/FormulaNorth_Logo.png`);
    if (logoResponse.ok) {
      const buffer = await logoResponse.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      logoDataUrl = `data:image/png;base64,${base64}`;
    }
  } catch {
    // Fall back below.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #fffaf1 0%, #fff 50%, #e8f4f1 100%)",
          padding: "60px",
          fontFamily: "Georgia, serif",
          textAlign: "center",
        }}
      >
        {/* Logo — centered, large enough to survive a square crop */}
        {logoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoDataUrl}
            alt={siteConfig.name}
            width={520}
            height={158}
            style={{ objectFit: "contain", marginBottom: "32px" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#0d6c63",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "44px",
                fontWeight: 700,
                fontFamily: "Georgia, serif",
              }}
            >
              FN
            </div>
            <div
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: "#0d6c63",
                letterSpacing: "-0.02em",
                fontFamily: "Georgia, serif",
              }}
            >
              FormulaNorth
            </div>
          </div>
        )}

        {/* Tagline — large, centered, brand color */}
        <div
          style={{
            display: "flex",
            fontSize: "52px",
            fontWeight: 700,
            color: "#0d6c63",
            letterSpacing: "-0.015em",
            marginBottom: "24px",
            lineHeight: 1.1,
          }}
        >
          {siteConfig.tagline}
        </div>

        {/* Sub-line — explains who it's for */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#3d3935",
            lineHeight: 1.4,
            maxWidth: "900px",
            marginBottom: "40px",
            fontFamily: "Helvetica, sans-serif",
          }}
        >
          The workspace for Canadian indie cosmetic makers
        </div>

        {/* Feature pills — at the bottom, optional content */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "1000px",
          }}
        >
          {[
            "CNF Readiness Checker",
            "Soap Calculator",
            "Hotlist Database",
            "Bilingual Labels",
          ].map((label) => (
            <div
              key={label}
              style={{
                fontSize: "20px",
                color: "#0d6c63",
                background: "#cbebe6",
                padding: "10px 20px",
                borderRadius: "999px",
                fontFamily: "Helvetica, sans-serif",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* URL pill — bottom right, decorative (gets cropped, that's OK) */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "48px",
            fontSize: "20px",
            color: "#0d6c63",
            fontFamily: "Helvetica, sans-serif",
            fontWeight: 500,
            opacity: 0.7,
          }}
        >
          formulanorth.ca
        </div>
      </div>
    ),
    { ...size }
  );
}
