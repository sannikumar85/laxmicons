import Constants from "expo-constants";
import { Platform } from "react-native";

function getExpoHost() {
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) return "";
  try { return new URL(`http://${hostUri}`).hostname; }
  catch { return hostUri.split(":")[0]; }
}

const expoHost = __DEV__ ? getExpoHost() : "";
const defaultApiHost = expoHost || (Platform.OS === "android" ? "10.0.2.2" : "localhost");
export const API_URL = (process.env.EXPO_PUBLIC_API_URL || `http://${defaultApiHost}:5000/api`).replace(/\/$/, "");
export const SERVER_URL = API_URL.replace(/\/api$/, "");

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  let response;
  try {
    response = await fetch(url, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
      signal: options.signal || controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`The server at ${API_URL} did not respond. Check that the backend is running and reachable from your phone.`);
    }
    throw new Error(`Could not connect to ${API_URL}. Keep the backend running on port 5000, connect your phone and computer to the same Wi-Fi, and allow port 5000 through Windows Firewall.`);
  } finally {
    clearTimeout(timeout);
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    const error = new Error(data.message || "Unable to complete this request.");
    error.status = response.status;
    throw error;
  }
  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  verifyEmail: (payload) => request("/auth/verify-email", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: (token) => request("/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
  forgotPassword: (payload) => request("/auth/forgot-password", { method: "POST", body: JSON.stringify(payload) }),
  resetPassword: (token, password) => request(`/auth/reset-password/${encodeURIComponent(token)}`, { method: "POST", body: JSON.stringify({ password }) }),
  getProjects: () => request("/projects"),
  getProject: (id) => request(`/projects/${id}`),
  getJobs: () => request("/jobs"),
  getJob: (id) => request(`/jobs/${id}`),
  sendContact: (payload) => request("/contact", { method: "POST", body: JSON.stringify(payload) }),
};

export function assetUrl(path) {
  if (!path || /^https?:\/\//i.test(path)) return path;
  return `${SERVER_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
