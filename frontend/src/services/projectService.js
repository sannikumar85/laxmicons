import api from "./api";

/**
 * Get all projects
 */
export const getProjects = async (
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
    `/projects${
      queryString ? `?${queryString}` : ""
    }`
  );
};

/**
 * Get single project
 */
export const getProjectById = async (
  projectId
) => {
  return api.get(
    `/projects/${projectId}`
  );
};

/**
 * Get user's projects
 */
export const getMyProjects = async () => {
  return api.get("/projects/mine");
};

/**
 * Create project
 */
export const createProject = async (
  projectData
) => {
  return api.post(
    "/projects",
    projectData
  );
};

/**
 * Create project with image/file
 */
export const createProjectWithImage =
  async (formData) => {
    return api.upload(
      "/projects",
      formData
    );
  };

/**
 * Update project
 */
export const updateProject = async (
  projectId,
  projectData
) => {
  return api.put(
    `/projects/${projectId}`,
    projectData
  );
};

/**
 * Update project with image
 */
export const updateProjectWithImage =
  async (projectId, formData) => {
    return apiRequestWithId(
      `/projects/${projectId}`,
      formData
    );
  };

/**
 * Delete project
 */
export const deleteProject = async (
  projectId
) => {
  return api.delete(
    `/projects/${projectId}`
  );
};

/**
 * Search projects
 */
export const searchProjects = async (
  search
) => {
  return api.get(
    `/projects?search=${encodeURIComponent(
      search
    )}`
  );
};

/**
 * Filter projects
 */
export const filterProjects = async (
  filters = {}
) => {
  return getProjects(filters);
};

/**
 * Helper for multipart PUT request
 */
const apiRequestWithId = async (
  endpoint,
  formData
) => {
  return api.request(endpoint, {
    method: "PUT",
    body: formData,
  });
};

const projectService = {
  getProjects,
  getProjectById,
  getMyProjects,
  createProject,
  createProjectWithImage,
  updateProject,
  updateProjectWithImage,
  deleteProject,
  searchProjects,
  filterProjects,
};

export default projectService;