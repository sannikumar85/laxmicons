import api from "./api";

/**
 * Get admin dashboard statistics
 */
export const getAdminStats = async () => {
  return api.get("/admin/stats");
};

/**
 * Get dashboard overview
 */
export const getAdminDashboard =
  async () => {
    return api.get(
      "/admin/dashboard"
    );
  };

/* ========================================
   USERS
======================================== */

/**
 * Get all users
 */
export const getAllUsers = async (
  params = {}
) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        query.append(key, value);
      }
    }
  );

  const queryString = query.toString();

  return api.get(
    `/users${
      queryString ? `?${queryString}` : ""
    }`
  );
};

/**
 * Get user by ID
 */
export const getUserById = async (
  userId
) => {
  return api.get(
    `/users/${userId}`
  );
};

/**
 * Update user
 */
export const updateUser = async (
  userId,
  userData
) => {
  return api.put(
    `/users/${userId}`,
    userData
  );
};

/**
 * Change user status
 */
export const updateUserStatus =
  async (userId, status) => {
    return api.patch(
      `/users/${userId}/status`,
      {
        status,
      }
    );
  };

/**
 * Delete user
 */
export const deleteUser = async (
  userId
) => {
  return api.delete(
    `/users/${userId}`
  );
};

/* ========================================
   CONTACT MESSAGES
======================================== */

/**
 * Get contact messages
 */
export const getContactMessages =
  async (params = {}) => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(
      ([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          query.append(key, value);
        }
      }
    );

    const queryString = query.toString();

    return api.get(
      `/contact${
        queryString
          ? `?${queryString}`
          : ""
      }`
    );
  };

/**
 * Get single contact message
 */
export const getContactMessageById =
  async (messageId) => {
    return api.get(
      `/contact/${messageId}`
    );
  };

/**
 * Mark contact message read
 */
export const markContactMessageRead =
  async (messageId) => {
    return api.patch(
      `/contact/${messageId}/read`
    );
  };

/**
 * Delete contact message
 */
export const deleteContactMessage =
  async (messageId) => {
    return api.delete(
      `/contact/${messageId}`
    );
  };

/* ========================================
   ADMIN SETTINGS
======================================== */

/**
 * Get admin settings
 */
export const getAdminSettings =
  async () => {
    return api.get(
      "/admin/settings"
    );
  };

/**
 * Update admin settings
 */
export const updateAdminSettings =
  async (settings) => {
    return api.put(
      "/admin/settings",
      settings
    );
  };

const adminService = {
  getAdminStats,
  getAdminDashboard,

  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,

  getContactMessages,
  getContactMessageById,
  markContactMessageRead,
  deleteContactMessage,

  getAdminSettings,
  updateAdminSettings,
};

export default adminService;