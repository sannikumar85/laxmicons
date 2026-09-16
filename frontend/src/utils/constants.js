// ========================================
// APPLICATION
// ========================================

export const APP_NAME = "Laxmi Construction";

export const APP_DESCRIPTION =
  "Construction, consultancy and labour management services.";


// ========================================
// USER ROLES
// ========================================

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};


// ========================================
// PROJECT STATUS
// ========================================

export const PROJECT_STATUS = {
  UPCOMING: "Upcoming",
  ONGOING: "Ongoing",
  COMPLETED: "Completed",
};


// ========================================
// SERVICE REQUEST STATUS
// ========================================

export const SERVICE_REQUEST_STATUS = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};


// ========================================
// LABOUR REQUEST STATUS
// ========================================

export const LABOUR_REQUEST_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};


// ========================================
// JOB APPLICATION STATUS
// ========================================

export const JOB_APPLICATION_STATUS = {
  PENDING: "Pending",
  UNDER_REVIEW: "Under Review",
  SHORTLISTED: "Shortlisted",
  SELECTED: "Selected",
  REJECTED: "Rejected",
};


// ========================================
// JOB STATUS
// ========================================

export const JOB_STATUS = {
  ACTIVE: "Active",
  CLOSED: "Closed",
};


// ========================================
// PROJECT CATEGORIES
// ========================================

export const PROJECT_CATEGORIES = [
  "Residential",
  "Commercial",
  "Renovation",
  "Infrastructure",
  "Consultancy",
];


// ========================================
// SERVICES
// ========================================

export const SERVICES = [
  {
    id: "residential-construction",
    title: "Residential Construction",
    description:
      "Complete residential construction services from planning to finishing.",
  },
  {
    id: "commercial-construction",
    title: "Commercial Construction",
    description:
      "Professional construction solutions for commercial buildings and spaces.",
  },
  {
    id: "consultancy",
    title: "Construction Consultancy",
    description:
      "Professional guidance for planning, design, budgeting and execution.",
  },
  {
    id: "renovation",
    title: "Renovation & Remodeling",
    description:
      "Modern renovation and remodeling solutions for existing properties.",
  },
];


// ========================================
// LABOUR SKILLS
// ========================================

export const LABOUR_SKILLS = [
  "Mason",
  "Electrician",
  "Painter",
  "Plumber",
  "Carpenter",
  "Welder",
  "Helper",
  "Tile Worker",
  "Civil Worker",
];


// ========================================
// JOB TYPES
// ========================================

export const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
];


// ========================================
// EXPERIENCE LEVELS
// ========================================

export const EXPERIENCE_LEVELS = [
  "Fresher",
  "0-1 Years",
  "1-3 Years",
  "2-4 Years",
  "3-5 Years",
  "5+ Years",
];


// ========================================
// STORAGE KEYS
// ========================================

export const STORAGE_KEYS = {
  TOKEN: "token",
  ACCESS_TOKEN: "accessToken",
  USER: "user",
  THEME: "theme",
  LANGUAGE: "language",
};


// ========================================
// ROUTES
// ========================================

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  PROJECTS: "/projects",
  CAREERS: "/careers",
  CONTACT: "/contact",

  LOGIN: "/login",
  REGISTER: "/register",

  DASHBOARD: "/dashboard",
  PROFILE: "/dashboard/profile",
  MY_PROJECTS: "/dashboard/projects",
  SERVICE_REQUESTS: "/dashboard/service-requests",
  CREATE_SERVICE_REQUEST:
    "/dashboard/service-requests/create",
  LABOUR_REQUESTS:
    "/dashboard/labour-requests",
  JOB_APPLICATIONS:
    "/dashboard/job-applications",
  NOTIFICATIONS:
    "/dashboard/notifications",
  USER_SETTINGS:
    "/dashboard/settings",

  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_PROJECTS: "/admin/projects",
  ADMIN_ADD_PROJECT:
    "/admin/projects/add",
  ADMIN_SERVICE_REQUESTS:
    "/admin/service-requests",
  ADMIN_LABOUR: "/admin/labour",
  ADMIN_JOBS: "/admin/jobs",
  ADMIN_APPLICATIONS:
    "/admin/job-applications",
  ADMIN_MESSAGES:
    "/admin/contact-messages",
  ADMIN_SETTINGS:
    "/admin/settings",
};


// ========================================
// PAGINATION
// ========================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};


// ========================================
// FILE LIMITS
// ========================================

export const FILE_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024,
  MAX_RESUME_SIZE: 10 * 1024 * 1024,
};


// ========================================
// ALLOWED FILE TYPES
// ========================================

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];