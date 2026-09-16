const User = require("../models/User");
const Project = require("../models/Project");
const ServiceRequest = require("../models/ServiceRequest");
const Labour = require("../models/Labour");
const LabourRequest = require("../models/LabourRequest");
const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");
const ContactMessage = require("../models/ContactMessage");
const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/apiResponse");

exports.stats = asyncHandler(async (req, res) => {
  const [
    users, projects, serviceRequests, labour, labourRequests,
    jobs, jobApplications, contactMessages
  ] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Project.countDocuments(),
    ServiceRequest.countDocuments(),
    Labour.countDocuments(),
    LabourRequest.countDocuments(),
    Job.countDocuments(),
    JobApplication.countDocuments(),
    ContactMessage.countDocuments({ status: "unread" })
  ]);

  success(res, {
    stats: { users, projects, serviceRequests, labour, labourRequests, jobs, jobApplications, unreadMessages: contactMessages }
  });
});

exports.dashboard = asyncHandler(async (req, res) => {
  const [
    users, projects, serviceRequests, labourRequests,
    jobApplications, unreadMessages, recentProjects, recentRequests
  ] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Project.countDocuments(),
    ServiceRequest.countDocuments(),
    LabourRequest.countDocuments(),
    JobApplication.countDocuments(),
    ContactMessage.countDocuments({ status: "unread" }),
    Project.find().sort({ createdAt: -1 }).limit(5),
    ServiceRequest.find().populate("user", "name email").sort({ createdAt: -1 }).limit(5)
  ]);

  success(res, {
    stats: { users, projects, serviceRequests, labourRequests, jobApplications, unreadMessages },
    recentProjects,
    recentRequests
  });
});

exports.settings = asyncHandler(async (req, res) => {
  success(res, {
    settings: {
      companyName: "Laxmi Construction",
      email: process.env.ADMIN_EMAIL || "",
      environment: process.env.NODE_ENV || "development"
    }
  });
});

exports.updateSettings = asyncHandler(async (req, res) => {
  success(res, { settings: req.body }, "Settings saved. Application-level settings can be persisted in a dedicated settings collection later.");
});
