"use cache";

/**
 * Returns the current year.
 *
 * Cache Components treats `new Date()` as an unstable value during
 * prerendering, so the read is wrapped in `"use cache"` — Next.js then
 * prerenders and caches the result instead of failing the static build.
 */
export async function getCurrentYear(): Promise<number> {
  return new Date().getFullYear();
}
