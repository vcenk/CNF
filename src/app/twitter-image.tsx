// Twitter/X cards reuse the OG generator. Re-exports of `runtime` aren't
// statically analysable by Next.js's bundler, so we declare the config
// fields here directly and only call into the OG image's render function.
import OpenGraphImage from "./opengraph-image";

export const runtime = "edge";
export const alt = "FormulaNorth — Formulate. Comply. Sell.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpenGraphImage;
