import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d6c63",
          color: "#fffaf1",
          fontSize: "36px",
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.04em",
          borderRadius: "16px",
        }}
      >
        FN
      </div>
    ),
    { ...size }
  );
}
