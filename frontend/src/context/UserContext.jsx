import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "../hooks/useAuth";
import userService from "../services/userService";

export const UserContext = createContext(null);

const USER_STORAGE_KEY = "laxmi_user_profile";

const defaultUserData = {
  phone: "",
  address: "",
  city: "",
  state: "",
  profileImage: "",
  bio: "",
};

const UserContextProvider = ({ children }) => {
  const { user, isAuthenticated, updateUser } = useAuth();

  const [profile, setProfile] = useState(defaultUserData);
  const [loading, setLoading] = useState(false);

  /* Load profile */
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setProfile(defaultUserData);
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await userService.getMyProfile();
        const userProfile = response?.data?.user;
        if (userProfile) {
          setProfile({ ...defaultUserData, ...userProfile });
          return;
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }

      try {
      const storedProfile = localStorage.getItem(
        USER_STORAGE_KEY
      );

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        setProfile(defaultUserData);
      }
      } catch (error) {
      console.error("Failed to load user profile:", error);
      setProfile(defaultUserData);
      }
    };

    loadProfile();
  }, [isAuthenticated, user]);

  /* Update profile */
  const updateProfile = useCallback(
    async (profileData) => {
      setLoading(true);

      try {
        const response = await userService.updateMyProfile(profileData);
        const updatedProfile = response?.data?.user;
        if (!updatedProfile) throw new Error("Invalid profile response.");
        setProfile({ ...defaultUserData, ...updatedProfile });

        /*
          Update basic user information if needed.
        */
        if (profileData.name) {
          updateUser({
            name: profileData.name,
          });
        }

        return {
          success: true,
          profile: updatedProfile,
        };
      } catch (error) {
        console.error(
          "Profile update failed:",
          error
        );

        return {
          success: false,
          message: error.message || "Unable to update profile.",
        };
      } finally {
        setLoading(false);
      }
    },
    [profile, updateUser]
  );

  /* Clear profile */
  const clearProfile = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setProfile(defaultUserData);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      loading,
      updateProfile,
      clearProfile,
    }),
    [
      profile,
      loading,
      updateProfile,
      clearProfile,
    ]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;