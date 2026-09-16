import {
  STORAGE_KEYS,
} from "./constants";


// ========================================
// SET ITEM
// ========================================

export const setItem = (
  key,
  value
) => {
  try {
    const serializedValue =
      typeof value === "string"
        ? value
        : JSON.stringify(value);

    localStorage.setItem(
      key,
      serializedValue
    );

    return true;
  } catch (error) {
    console.error(
      "Storage set error:",
      error
    );

    return false;
  }
};


// ========================================
// GET ITEM
// ========================================

export const getItem = (
  key,
  defaultValue = null
) => {
  try {
    const value =
      localStorage.getItem(key);

    if (value === null) {
      return defaultValue;
    }

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.error(
      "Storage get error:",
      error
    );

    return defaultValue;
  }
};


// ========================================
// REMOVE ITEM
// ========================================

export const removeItem = (
  key
) => {
  try {
    localStorage.removeItem(key);

    return true;
  } catch (error) {
    console.error(
      "Storage remove error:",
      error
    );

    return false;
  }
};


// ========================================
// CLEAR STORAGE
// ========================================

export const clearStorage = () => {
  try {
    localStorage.clear();

    return true;
  } catch (error) {
    console.error(
      "Storage clear error:",
      error
    );

    return false;
  }
};


// ========================================
// CHECK ITEM
// ========================================

export const hasItem = (
  key
) => {
  try {
    return (
      localStorage.getItem(key) !== null
    );
  } catch {
    return false;
  }
};


// ========================================
// TOKEN
// ========================================

export const setToken = (
  token
) => {
  return setItem(
    STORAGE_KEYS.TOKEN,
    token
  );
};


export const getToken = () => {
  return getItem(
    STORAGE_KEYS.TOKEN
  );
};


export const removeToken = () => {
  return removeItem(
    STORAGE_KEYS.TOKEN
  );
};


// ========================================
// ACCESS TOKEN
// ========================================

export const setAccessToken = (
  token
) => {
  return setItem(
    STORAGE_KEYS.ACCESS_TOKEN,
    token
  );
};


export const getAccessToken = () => {
  return getItem(
    STORAGE_KEYS.ACCESS_TOKEN
  );
};


export const removeAccessToken = () => {
  return removeItem(
    STORAGE_KEYS.ACCESS_TOKEN
  );
};


// ========================================
// USER
// ========================================

export const setUser = (
  user
) => {
  return setItem(
    STORAGE_KEYS.USER,
    user
  );
};


export const getUser = () => {
  return getItem(
    STORAGE_KEYS.USER
  );
};


export const removeUser = () => {
  return removeItem(
    STORAGE_KEYS.USER
  );
};


// ========================================
// AUTH CLEAR
// ========================================

export const clearAuthStorage = () => {
  removeItem(STORAGE_KEYS.TOKEN);
  removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  removeItem(STORAGE_KEYS.USER);
};


// ========================================
// THEME
// ========================================

export const setTheme = (
  theme
) => {
  return setItem(
    STORAGE_KEYS.THEME,
    theme
  );
};


export const getTheme = () => {
  return getItem(
    STORAGE_KEYS.THEME,
    "light"
  );
};


// ========================================
// LANGUAGE
// ========================================

export const setLanguage = (
  language
) => {
  return setItem(
    STORAGE_KEYS.LANGUAGE,
    language
  );
};


export const getLanguage = () => {
  return getItem(
    STORAGE_KEYS.LANGUAGE,
    "en"
  );
};


// ========================================
// SESSION CHECK
// ========================================

export const isLoggedIn = () => {
  return Boolean(
    getToken() ||
      getAccessToken()
  );
};


const storage = {
  setItem,
  getItem,
  removeItem,
  clearStorage,
  hasItem,

  setToken,
  getToken,
  removeToken,

  setAccessToken,
  getAccessToken,
  removeAccessToken,

  setUser,
  getUser,
  removeUser,

  clearAuthStorage,

  setTheme,
  getTheme,

  setLanguage,
  getLanguage,

  isLoggedIn,
};

export default storage;