/** Data URIs of the logo mark for generated images (Open Graph, Apple touch icon). */
const mark = (back: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 80 80"><rect x="14" y="14" width="50" height="50" rx="14" fill="${back}"/><rect x="36" y="36" width="50" height="50" rx="14" fill="#FF6B57"/><path d="M50 36H64V50A14 14 0 0 1 50 64H36V50A14 14 0 0 1 50 36Z" fill="#28113D"/></svg>`;

export const markDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(mark("#3B1C5A"))}`;
export const reversedMarkDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(mark("#FBF4F8"))}`;
