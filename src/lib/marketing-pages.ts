import { siteConfig } from "./site-config";

export const marketingPages = [
  {
    title: "Health Canada Cosmetic Notification Software",
    href: "/health-canada-cosmetic-notification-software",
    description:
      "A software landing page targeting teams searching for a faster Health Canada cosmetic notification workflow."
  },
  {
    title: ".hcxs Export Software",
    href: "/hcxs-export",
    description:
      "A feature page focused on the portal export workflow and the value of a prebuilt .hcxs file."
  },
  {
    title: "Health Canada Cosmetic Notification Guide",
    href: "/guides/health-canada-cosmetic-notification",
    description:
      "A long-form guide explaining the process, timing, and what teams need before they submit."
  }
];

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}
