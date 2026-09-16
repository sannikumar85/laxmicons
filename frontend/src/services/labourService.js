import api from "./api";

/**
 * Get all labour
 */
export const getLabour = async (
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
    `/labour${
      queryString ? `?${queryString}` : ""
    }`
  );
};

/**
 * Get labour by ID
 */
export const getLabourById = async (
  labourId
) => {
  return api.get(
    `/labour/${labourId}`
  );
};

/**
 * Search labour
 */
export const searchLabour = async (
  search
) => {
  return api.get(
    `/labour?search=${encodeURIComponent(
      search
    )}`
  );
};

/**
 * Filter labour
 */
export const filterLabour = async (
  filters = {}
) => {
  return getLabour(filters);
};

/**
 * Create labour request
 */
export const createLabourRequest =
  async (requestData) => {
    return api.post(
      "/labour/requests",
      requestData
    );
  };

/**
 * Get my labour requests
 */
export const getMyLabourRequests =
  async () => {
    return api.get(
      "/labour/requests/mine"
    );
  };

/**
 * Get single labour request
 */
export const getLabourRequestById =
  async (requestId) => {
    return api.get(
      `/labour/requests/${requestId}`
    );
  };

/**
 * Cancel labour request
 */
export const cancelLabourRequest =
  async (requestId) => {
    return api.patch(
      `/labour/requests/${requestId}/cancel`
    );
  };

/**
 * Admin - get all labour requests
 */
export const getAllLabourRequests =
  async () => {
    return api.get(
      "/labour/admin/requests"
    );
  };

/**
 * Admin - update labour request
 */
export const updateLabourRequestStatus =
  async (requestId, status) => {
    return api.patch(
      `/labour/admin/requests/${requestId}/status`,
      {
        status,
      }
    );
  };

/**
 * Admin - add labour
 */
export const createLabour = async (
  labourData
) => {
  return api.post(
    "/labour/admin",
    labourData
  );
};

/**
 * Admin - update labour
 */
export const updateLabour = async (
  labourId,
  labourData
) => {
  return api.put(
    `/labour/admin/${labourId}`,
    labourData
  );
};

/**
 * Admin - delete labour
 */
export const deleteLabour = async (
  labourId
) => {
  return api.delete(
    `/labour/admin/${labourId}`
  );
};

const labourService = {
  getLabour,
  getLabourById,
  searchLabour,
  filterLabour,
  createLabourRequest,
  getMyLabourRequests,
  getLabourRequestById,
  cancelLabourRequest,
  getAllLabourRequests,
  updateLabourRequestStatus,
  createLabour,
  updateLabour,
  deleteLabour,
};

export default labourService;