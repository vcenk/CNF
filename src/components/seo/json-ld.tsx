/**
 * Safe JSON-LD structured-data injection.
 *
 * Why this exists:
 *   `<script type="application/ld+json" dangerouslySetInnerHTML={{
 *      __html: JSON.stringify(data)
 *    }} />`
 *   is the standard pattern, but JSON.stringify does NOT escape "<".
 *   If `data` contains user-controllable text (e.g. a supplier name
 *   submitted via the public /suppliers/suggest form and approved into
 *   the directory), an attacker could inject:
 *     "abc</script><script>alert(1)</script>"
 *   which closes the JSON-LD block early and executes attacker JS in
 *   the user's browser.
 *
 *   This component escapes the characters that can break out of a
 *   <script> tag or break some JSON parsers:
 *     <       -> <
 *     >       -> >
 *     &       -> &
 *     U+2028  -> \u2028   (line separator)
 *     U+2029  -> \u2029   (paragraph separator)
 *
 *   The result is still valid JSON and still parsed correctly by
 *   Google's structured-data crawler.
 *
 * Usage:
 *   <JsonLd data={structuredData} />
 *   <JsonLd data={[ ...arrayOfStructuredData ]} />
 */

interface JsonLdProps {
  data: unknown;
}

function safeStringify(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeStringify(data) }}
    />
  );
}
