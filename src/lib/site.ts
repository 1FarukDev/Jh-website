/**
 * Canonical production URL. Override with NEXT_PUBLIC_SITE_URL in env (e.g. preview deployments).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jesudarahinmikaiye.com"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${p}`;
}
