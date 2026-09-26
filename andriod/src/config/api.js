import Constants from "expo-constants";
import { Platform } from "react-native";

function expoDevelopmentHost() {
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) return "";
  try { return new URL(`http://${hostUri}`).hostname; }
  catch { return hostUri.split(":")[0]; }
}
const expoHost = __DEV__ ? expoDevelopmentHost() : "";
const apiHost = expoHost || (Platform.OS === "android" ? "10.0.2.2" : "localhost");
export const API_URL = (process.env.EXPO_PUBLIC_API_URL || `http://${apiHost}:5000/api`).replace(/\/$/, "");
export const SERVER_URL = API_URL.replace(/\/api$/, "");
let accessToken = null;
export function setAccessToken(token) { accessToken = token || null; }

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = {
    ...(!isFormData ? { "Content-Type": "application/json" } : {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(options.headers || {}),
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  let response;
  try {
    response = await fetch(url, { ...options, headers, signal: options.signal || controller.signal });
  } catch (error) {
    if (error.name === "AbortError") throw new Error(`The server at ${API_URL} did not respond. Check that the backend is running and reachable from your phone.`);
    throw new Error(`Could not connect to ${API_URL}. Keep the backend running on port 5000, connect your phone and computer to the same Wi-Fi, and allow port 5000 through Windows Firewall.`);
  } finally { clearTimeout(timeout); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    const error = new Error(data.message || "Unable to complete this request.");
    error.status = response.status;
    throw error;
  }
  return data;
}

export const api = {
  request,
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  verifyEmail: (payload) => request("/auth/verify-email", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  forgotPassword: (payload) => request("/auth/forgot-password", { method: "POST", body: JSON.stringify(payload) }),
  resetPassword: (token, password) => request(`/auth/reset-password/${encodeURIComponent(token)}`, { method: "POST", body: JSON.stringify({ password }) }),
  me: (token) => request("/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
  getProfile: () => request("/users/me"),
  updateProfile: (payload) => request("/users/me", { method: "PUT", body: JSON.stringify(payload) }),
  updateProfileWithImage: (form) => request("/users/me", { method: "PUT", body: form }),
  changePassword: (payload) => request("/auth/change-password", { method: "PUT", body: JSON.stringify(payload) }),
  deleteAccount: () => request("/users/me", { method: "DELETE" }),
  getNotifications: () => request("/users/notifications"),
  markNotificationRead: (id) => request(`/users/notifications/${id}/read`, { method: "PATCH" }),
  markAllNotificationsRead: () => request("/users/notifications/read-all", { method: "PATCH" }),
  deleteNotification: (id) => request(`/users/notifications/${id}`, { method: "DELETE" }),
  updateNotificationPreferences: (payload) => request("/users/notification-preferences", { method: "PATCH", body: JSON.stringify(payload) }),
  getProjects: (query = "") => request(`/projects${query}`),
  getMyProjects: () => request("/projects/mine"),
  getProject: (id) => request(`/projects/${id}`),
  getJobs: (query = "") => request(`/jobs${query}`),
  getJob: (id) => request(`/jobs/${id}`),
  applyForJob: (id, form) => request(`/jobs/${id}/apply`, { method: "POST", body: form }),
  applyGeneral: (form) => request("/jobs/general-apply", { method: "POST", body: form }),
  getMyApplications: () => request("/jobs/applications/mine"),
  getServiceRequests: () => request("/service-requests/mine"),
  createServiceRequest: (payload) => request("/service-requests", { method: "POST", body: JSON.stringify(payload) }),
  cancelServiceRequest: (id) => request(`/service-requests/${id}/cancel`, { method: "PATCH" }),
  getLabour: (query = "") => request(`/labour${query}`),
  createLabourRequest: (payload) => request("/labour/requests", { method: "POST", body: JSON.stringify(payload) }),
  getMyLabourRequests: () => request("/labour/requests/mine"),
  cancelLabourRequest: (id) => request(`/labour/requests/${id}/cancel`, { method: "PATCH" }),
  sendContact: (payload) => request("/contact", { method: "POST", body: JSON.stringify(payload) }),
  adminDashboard: () => request("/admin/dashboard"),
  adminStats: () => request("/admin/stats"),
  adminSettings: () => request("/admin/settings"),
  updateAdminSettings: (payload) => request("/admin/settings", { method: "PUT", body: JSON.stringify(payload) }),
  adminServiceRequests: () => request("/service-requests"),
  adminLabourRequests: () => request("/labour/admin/requests"),
  createLabourProfile: (payload) => request("/labour/admin", { method: "POST", body: JSON.stringify(payload) }),
  updateLabourProfile: (id, payload) => request(`/labour/admin/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteLabourProfile: (id) => request(`/labour/admin/${id}`, { method: "DELETE" }),
  updateAdminServiceStatus: (id, payload) => request(`/service-requests/${id}/status`, { method: "PATCH", body: JSON.stringify(payload) }),
  updateAdminLabourStatus: (id, payload) => request(`/labour/admin/requests/${id}/status`, { method: "PATCH", body: JSON.stringify(payload) }),
  adminJobs: () => request("/jobs?status=all"),
  createJob: (payload) => request("/jobs", { method: "POST", body: JSON.stringify(payload) }),
  updateJob: (id, payload) => request(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteJob: (id) => request(`/jobs/${id}`, { method: "DELETE" }),
  adminApplications: () => request("/jobs/admin/applications/all"),
  updateApplicationStatus: (id, status) => request(`/jobs/admin/applications/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteApplication: (id) => request(`/jobs/admin/applications/${id}`, { method: "DELETE" }),
  adminProjects: () => request("/projects?status=all&limit=100"),
  createProject: (payload) => request("/projects", { method: "POST", body: JSON.stringify(payload) }),
  updateProject: (id, payload) => request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: "DELETE" }),
  adminUsers: () => request("/users"),
  updateUserStatus: (id, status) => request(`/users/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE" }),
  adminMessages: () => request("/contact"),
  markMessageRead: (id) => request(`/contact/${id}/read`, { method: "PATCH" }),
  deleteMessage: (id) => request(`/contact/${id}`, { method: "DELETE" }),
};

export function assetUrl(path) {
  if (!path || /^https?:\/\//i.test(path)) return path;
  return `${SERVER_URL}${path.startsWith("/") ? path : `/${path}`}`;
}



