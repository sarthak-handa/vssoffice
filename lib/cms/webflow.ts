import type { SiteContent } from "./types";

type WebflowItem = { fieldData?: Record<string, unknown> };

const apiBase = "https://api.webflow.com/v2/collections";

async function getCollection(collectionId?: string): Promise<WebflowItem[]> {
  const token = process.env.WEBFLOW_API_TOKEN;
  if (!token || !collectionId) return [];

  const response = await fetch(`${apiBase}/${collectionId}/items/live`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error(`Webflow collection request failed: ${response.status}`);
  const data = (await response.json()) as { items?: WebflowItem[] };
  return data.items ?? [];
}

/**
 * Webflow fields intentionally map into the same domain types used by mock.ts.
 * Add field transforms here when the live collection field slugs are final.
 */
export async function getWebflowContent(): Promise<Partial<SiteContent> | null> {
  if (!process.env.WEBFLOW_API_TOKEN) return null;
  await Promise.all([
    getCollection(process.env.WEBFLOW_COLLECTION_SOLUTIONS),
    getCollection(process.env.WEBFLOW_COLLECTION_PRODUCTS),
    getCollection(process.env.WEBFLOW_COLLECTION_EXPERIENCE_SCENES),
  ]);
  return null;
}
