import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #fffaf1 0%, #fff 35%, #cbebe6 100%)",
          padding: "70px",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              background: "#0d6c63",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "26px",
              fontWeight: 700,
              fontFamily: "Georgia, serif",
            }}
          >
            FN
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#0d6c63",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "Helvetica, sans-serif",
            }}
          >
            For Canadian indie cosmetic makers
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            fontSize: "84px",
            fontWeight: 700,
            color: "#1e1a17",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
          }}
        >
          {siteConfig.name}
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "44px",
            fontWeight: 600,
            color: "#0d6c63",
            letterSpacing: "-0.01em",
            marginBottom: "auto",
          }}
        >
          {siteConfig.tagline}
        </div>

        {/* Footer description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "60px",
          }}
        >
          <div
            style={{
              fontSize: "26px",
              color: "#56524d",
              lineHeight: 1.4,
              maxWidth: "880px",
              fontFamily: "Helvetica, sans-serif",
            }}
          >
            Formulate, cost, label, and prepare CNF — all in one workspace.
          </div>
          <div
            style={{
              display: "flex",
              gap: "14px",
              marginTop: "12px",
              flexWrap: "wrap",
            }}
          >
            {[
              "75-oil soap calculator",
              "CNF readiness checker",
              "Bilingual EN/FR labels",
              "Hotlist database",
            ].map((label) => (
              <div
                key={label}
                style={{
                  fontSize: "20px",
                  color: "#0d6c63",
                  background: "#cbebe6",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontFamily: "Helvetica, sans-serif",
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* URL pill */}
        <div
          style={{
            position: "absolute",
            bottom: "42px",
            right: "70px",
            fontSize: "22px",
            color: "#0d6c63",
            fontFamily: "Helvetica, sans-serif",
            fontWeight: 500,
          }}
        >
          formulanorth.ca
        </div>
      </div>
    ),
    { ...size }
  );
}
