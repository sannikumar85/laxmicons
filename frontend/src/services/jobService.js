import api from "./api";

/**
 * Get all jobs
 */
export const getJobs = async (
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
    `/jobs${
      queryString ? `?${queryString}` : ""
    }`
  );
};

/**
 * Get single job
 */
export const getJobById = async (
  jobId
) => {
  return api.get(`/jobs/${jobId}`);
};

/**
 * Search jobs
 */
export const searchJobs = async (
  search
) => {
  return api.get(
    `/jobs?search=${encodeURIComponent(
      search
    )}`
  );
};

/**
 * Create job
 * Admin
 */
export const createJob = async (
  jobData
) => {
  return api.post(
    "/jobs",
    jobData
  );
};

/**
 * Update job
 * Admin
 */
export const updateJob = async (
  jobId,
  jobData
) => {
  return api.put(
    `/jobs/${jobId}`,
    jobData
  );
};

/**
 * Delete job
 * Admin
 */
export const deleteJob = async (
  jobId
) => {
  return api.delete(
    `/jobs/${jobId}`
  );
};

/**
 * Apply for job
 */
export const applyForJob = async (
  jobId,
  applicationData
) => {
  const data = {
    ...applicationData,
    jobId,
  };

  return api.post(
    `/jobs/${jobId}/apply`,
    data
  );
};

/**
 * Apply for job with resume
 */
export const applyForJobWithResume =
  async (jobId, formData) => {
    if (!formData.has("jobId")) {
      formData.append(
        "jobId",
        jobId
      );
    }

    return api.upload(
      `/jobs/${jobId}/apply`,
      formData
    );
  };

export const applyForGeneralJob = async (formData) => api.upload("/jobs/general-apply", formData);

/**
 * Get my applications
 */
export const getMyJobApplications =
  async () => {
    return api.get(
      "/jobs/applications/mine"
    );
  };

/**
 * Get application by ID
 */
export const getJobApplicationById =
  async (applicationId) => {
    return api.get(
      `/jobs/applications/${applicationId}`
    );
  };

/**
 * Admin - get all applications
 */
export const getAllJobApplications =
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
      `/jobs/admin/applications/all${
        queryString
          ? `?${queryString}`
          : ""
      }`
    );
  };

/**
 * Admin - update application status
 */
export const updateApplicationStatus =
  async (
    applicationId,
    status
  ) => {
    return api.patch(
      `/jobs/admin/applications/${applicationId}/status`,
      {
        status,
      }
    );
  };

/**
 * Admin - delete application
 */
export const deleteJobApplication =
  async (applicationId) => {
    return api.delete(
      `/jobs/admin/applications/${applicationId}`
    );
  };

const jobService = {
  getJobs,
  getJobById,
  searchJobs,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  applyForJobWithResume,
  applyForGeneralJob,
  getMyJobApplications,
  getJobApplicationById,
  getAllJobApplications,
  updateApplicationStatus,
  deleteJobApplication,
};

export default jobService;