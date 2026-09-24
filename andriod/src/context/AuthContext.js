import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../config/api";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    SecureStore.getItemAsync("laxmi.auth").then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw);
          if (saved?.token && saved?.user) {
            if (live) { setSession(saved); setReady(true); }
            api.me(saved.token).then((response) => {
              if (live) {
                const refreshed = { token: saved.token, user: response.data.user };
                setSession(refreshed);
                return SecureStore.setItemAsync("laxmi.auth", JSON.stringify(refreshed));
              }
            }).catch(async (error) => {
              if (error.status === 401 || error.status === 403) {
                await SecureStore.deleteItemAsync("laxmi.auth");
                if (live) setSession(null);
              }
            });
            return;
          }
          return SecureStore.deleteItemAsync("laxmi.auth");
        } catch { return SecureStore.deleteItemAsync("laxmi.auth"); }
      }
    }).catch(() => {}).finally(() => { if (live) setReady(true); });
    return () => { live = false; };
  }, []);
  const signIn = async (payload) => {
    await SecureStore.setItemAsync("laxmi.auth", JSON.stringify(payload));
    setSession(payload);
  };
  const signOut = async () => {
    await SecureStore.deleteItemAsync("laxmi.auth");
    setSession(null);
  };
  return <AuthContext.Provider value={{ session, ready, signIn, signOut }}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }
