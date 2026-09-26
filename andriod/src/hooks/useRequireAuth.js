import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
export function useRequireAuth(admin = false) {
  const auth = useAuth();
  useEffect(() => {
    if (!auth.ready) return;
    if (!auth.session) router.replace("/login");
    else if (admin && auth.session.user?.role !== "admin") router.replace("/home");
  }, [auth.ready, auth.session, admin]);
  return auth;
}
