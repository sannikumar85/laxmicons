import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import userService from "../services/userService";

export const NotificationContext = createContext(null);

const NotificationContextProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated) { setNotifications([]); return; }
    try { const response = await userService.getNotifications(); setNotifications(response?.data?.notifications || []); }
    catch (error) { console.error("Unable to load notifications:", error); }
  }, [isAuthenticated]);
  useEffect(() => { refreshNotifications(); }, [refreshNotifications]);
  const addNotification = useCallback((notification) => setNotifications((previous) => [{ ...notification, id: notification.id || `${Date.now()}-${Math.random()}`, read: false }, ...previous]), []);
  const markAsRead = useCallback((id) => { setNotifications((previous) => previous.map((item) => String(item._id || item.id) === String(id) ? { ...item, read: true } : item)); userService.markNotificationRead(id).catch((error) => console.error("Unable to mark notification:", error)); }, []);
  const markAllAsRead = useCallback(() => { setNotifications((previous) => previous.map((item) => ({ ...item, read: true }))); userService.markAllNotificationsRead().catch((error) => console.error("Unable to mark notifications:", error)); }, []);
  const removeNotification = useCallback((id) => { setNotifications((previous) => previous.filter((item) => String(item._id || item.id) !== String(id))); userService.deleteNotification(id).catch((error) => console.error("Unable to delete notification:", error)); }, []);
  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const value = useMemo(() => ({ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, removeNotification, refreshNotifications }), [notifications, unreadCount, addNotification, markAsRead, markAllAsRead, removeNotification, refreshNotifications]);
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotifications = () => { const context = useContext(NotificationContext); if (!context) throw new Error("useNotifications must be used inside NotificationContextProvider"); return context; };
export default NotificationContextProvider;
