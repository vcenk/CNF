import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CNF Builder",
    short_name: "CNF Builder",
    description: "AI-assisted CNF workflows for Health Canada cosmetic submissions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e8",
    theme_color: "#0d6c63"
  };
}

