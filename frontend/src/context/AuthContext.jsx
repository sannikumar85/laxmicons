import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import authService from "../services/authService";

export const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "laxmi_auth_user";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedUser) return null;

    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to read authentication data:", error);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);

  /* Check existing session */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = getStoredUser();

        if (storedUser) {
          setUser(storedUser);
          try {
            const response = await authService.getCurrentUser();
            const currentUser = response?.data?.user;
            if (currentUser) {
              localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
              setUser(currentUser);
            }
          } catch {
            authService.logoutUser();
            localStorage.removeItem(AUTH_STORAGE_KEY);
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Authentication initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /* Login */
  const login = useCallback(async (credentials) => {
    try {
      const response = await authService.loginUser(credentials.email, credentials.password);
      const loggedInUser = response?.data?.user;
      if (!loggedInUser) throw new Error("Invalid login response.");
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Unable to login. Please try again.",
      };
    }
  }, []);

  /* Register */
  const register = useCallback(async (userData) => {
    try {
      const response = await authService.registerUser(userData);
      const newUser = response?.data?.user;
      if (!newUser) throw new Error("Invalid registration response.");
      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      console.error("Registration failed:", error);

      return {
        success: false,
        message: error.message || "Registration failed. Please try again.",
      };
    }
  }, []);

  const setVerifiedSession = useCallback((sessionUser, token) => {
    if (token) localStorage.setItem("token", token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  }, []);

  /* Logout */
  const logout = useCallback(() => {
    authService.logoutUser();
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  /* Update local user */
  const updateUser = useCallback((updatedData) => {
    setUser((currentUser) => {
      if (!currentUser) return null;

      const updatedUser = {
        ...currentUser,
        ...updatedData,
      };

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      login,
      register,
      logout,
      updateUser,
      setVerifiedSession,
    }),
    [
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
      setVerifiedSession,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;