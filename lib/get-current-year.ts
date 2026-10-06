/**
 * Returns the current year. With a static export this is evaluated once at
 * build time and baked into the generated HTML.
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
