import api from "./api";

/**
 * Create service request
 */
export const createServiceRequest =
  async (requestData) => {
    return api.post(
      "/service-requests",
      requestData
    );
  };

/**
 * Get my service requests
 */
export const getMyServiceRequests =
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
      `/service-requests/mine${
        queryString
          ? `?${queryString}`
          : ""
      }`
    );
  };

/**
 * Get single request
 */
export const getServiceRequestById =
  async (requestId) => {
    return api.get(
      `/service-requests/${requestId}`
    );
  };

/**
 * Cancel service request
 */
export const cancelServiceRequest =
  async (requestId) => {
    return api.patch(
      `/service-requests/${requestId}/cancel`
    );
  };

/**
 * Get all service requests
 * Admin
 */
export const getAllServiceRequests =
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
      `/service-requests${
        queryString
          ? `?${queryString}`
          : ""
      }`
    );
  };

/**
 * Update request status
 * Admin
 */
export const updateServiceRequestStatus =
  async (requestId, status) => {
    return api.patch(
      `/service-requests/${requestId}/status`,
      {
        status,
      }
    );
  };

/**
 * Delete request
 * Admin
 */
export const deleteServiceRequest =
  async (requestId) => {
    return api.delete(
      `/service-requests/${requestId}`
    );
  };

const serviceRequestService = {
  createServiceRequest,
  getMyServiceRequests,
  getServiceRequestById,
  cancelServiceRequest,
  getAllServiceRequests,
  updateServiceRequestStatus,
  deleteServiceRequest,
};

export default serviceRequestService;