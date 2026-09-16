import api from "./api";

/**
 * Get my profile
 */
export const getMyProfile = async () => {
  return api.get("/users/me");
};

/**
 * Update my profile
 */
export const updateMyProfile = async (
  profileData
) => {
  return api.put(
    "/users/me",
    profileData
  );
};

/**
 * Update profile with image
 */
export const updateProfileWithImage =
  async (formData) => {
    return api.request("/users/me", {
      method: "PUT",
      body: formData,
    });
  };

/**
 * Change user password
 */
export const changeUserPassword =
  async (
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
 * Get user notifications
 */
export const getNotifications =
  async () => {
    return api.get("/users/notifications");
  };

/**
 * Mark notification as read
 */
export const markNotificationRead =
  async (notificationId) => {
    return api.patch(
      `/users/notifications/${notificationId}/read`
    );
  };

/**
 * Mark all notifications as read
 */
export const markAllNotificationsRead =
  async () => {
    return api.patch(
      "/users/notifications/read-all"
    );
  };

/**
 * Delete notification
 */
export const deleteNotification =
  async (notificationId) => {
    return api.delete(
      `/users/notifications/${notificationId}`
    );
  };

/**
 * Update notification preferences
 */
export const updateNotificationPreferences =
  async (preferences) => {
    return api.put(
      "/users/notification-preferences",
      preferences
    );
  };

/**
 * Delete own account
 */
export const deleteMyAccount =
  async () => {
    return api.delete("/users/me");
  };

const userService = {
  getMyProfile,
  updateMyProfile,
  updateProfileWithImage,
  changeUserPassword,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  updateNotificationPreferences,
  deleteMyAccount,
};

export default userService;