const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const backendUrl = apiUrl.replace(/\/api\/?$/, "");

/** Converts API-relative upload paths into browser-safe image URLs. */
export function assetUrl(path) {
  if (!path || path.startsWith("data:") || /^https?:\/\//i.test(path)) return path;
  return `${backendUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
