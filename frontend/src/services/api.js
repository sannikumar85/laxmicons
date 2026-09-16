const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/**
 * Get authentication token
 */
const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken")
  );
};

/**
 * Common API request handler
 */
const apiRequest = async (
  endpoint,
  options = {}
) => {
  const token = getToken();

  const isFormData =
    options.body instanceof FormData;

  const headers = {
    ...(isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        }),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    const contentType =
      response.headers.get("content-type");

    const data = contentType?.includes(
      "application/json"
    )
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        data?.error ||
        "Something went wrong";

      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(
      `API Error [${endpoint}]:`,
      error
    );

    throw error;
  }
};

/**
 * GET request
 */
export const get = (endpoint) => {
  return apiRequest(endpoint, {
    method: "GET",
  });
};

/**
 * POST request
 */
export const post = (
  endpoint,
  data = {}
) => {
  return apiRequest(endpoint, {
    method: "POST",
    body:
      data instanceof FormData
        ? data
        : JSON.stringify(data),
  });
};

/**
 * PUT request
 */
export const put = (
  endpoint,
  data = {}
) => {
  return apiRequest(endpoint, {
    method: "PUT",
    body:
      data instanceof FormData
        ? data
        : JSON.stringify(data),
  });
};

/**
 * PATCH request
 */
export const patch = (
  endpoint,
  data = {}
) => {
  return apiRequest(endpoint, {
    method: "PATCH",
    body:
      data instanceof FormData
        ? data
        : JSON.stringify(data),
  });
};

/**
 * DELETE request
 */
export const remove = (endpoint) => {
  return apiRequest(endpoint, {
    method: "DELETE",
  });
};

/**
 * Upload file
 */
export const upload = (
  endpoint,
  formData
) => {
  return apiRequest(endpoint, {
    method: "POST",
    body: formData,
  });
};

const api = {
  get,
  post,
  put,
  patch,
  delete: remove,
  upload,
  request: apiRequest,
};

export default api;