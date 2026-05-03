import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

const staticPaths = [
  "",
  "/shop",
  "/about",
  "/blog",
  "/contact",
  "/client",
  "/delivery",
  "/terms",
  "/license",
  "/privacy-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path === "" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : ("weekly" as const),
    priority: path === "" ? 1 : 0.85,
  }));

  try {
    const supabase = await createClient();

    const [{ data: products }, { data: blogs }, clientRes] = await Promise.all([
      supabase
        .from("products")
        .select("id, updated_at")
        .eq("status", "published"),
      supabase.from("blogs").select("slug"),
      supabase.from("clients").select("slug"),
    ]);

    const productEntries: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
      url: `${siteUrl}/shop/${p.id}`,
      lastModified: p.updated_at ? new Date(p.updated_at as string) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const blogEntries: MetadataRoute.Sitemap = (blogs ?? []).map((b) => ({
      url: `${siteUrl}/blog/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

    const clientEntries: MetadataRoute.Sitemap = (clientRes.data ?? []).map(
      (c) => ({
        url: `${siteUrl}/client/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })
    );

    return [
      ...staticEntries,
      ...productEntries,
      ...blogEntries,
      ...clientEntries,
    ];
  } catch {
    return staticEntries;
  }
}
