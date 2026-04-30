import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0d6c63 0%, #094e47 100%)",
          color: "#fffaf1",
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
    ),
    { ...size }
  );
}
