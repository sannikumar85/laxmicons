import api from "./api";

/**
 * Login user
 */
export const loginUser = async (
  email,
  password
) => {
  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  if (response?.data?.token) {
    localStorage.setItem(
      "token",
      response.data.token
    );
  }

  if (response?.accessToken) {
    localStorage.setItem(
      "accessToken",
      response.accessToken
    );
  }

  if (response?.data?.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return response;
};

/**
 * Register new user
 */
export const registerUser = async (
  userData
) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response;
};

/**
 * Get logged-in user
 */
export const getCurrentUser = async () => {
  return api.get("/auth/me");
};

export const verifyEmail = async (email, code) => api.post("/auth/verify-email", { email, code });

/**
 * Logout
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  sessionStorage.clear();
};

/**
 * Forgot password
 */
export const forgotPassword = async (
  email
) => {
  return api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );
};

/**
 * Reset password
 */
export const resetPassword = async (
  token,
  password
) => {
  return api.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );
};

/**
 * Change password
 */
export const changePassword = async (
  currentPassword,
  newPassword
) => {
  return api.put(
    "/auth/change-password",
    {
      currentPassword,
      newPassword,
    }
  );
};

/**
 * Check whether user is logged in
 */
export const isAuthenticated = () => {
  return Boolean(
    localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
  );
};

const authService = {
  loginUser,
  registerUser,
  getCurrentUser,
  verifyEmail,
  logoutUser,
  forgotPassword,
  resetPassword,
  changePassword,
  isAuthenticated,
};

export default authService;