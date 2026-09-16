const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");

function normalizeBody(body) {
  const data = { ...body };
  if (data.budget !== undefined) data.budget = Number(data.budget) || 0;
  if (data.progress !== undefined) data.progress = Number(data.progress) || 0;
  if (typeof data.featured === "string") data.featured = data.featured === "true";
  if (data.gallery && typeof data.gallery === "string") {
    try { data.gallery = JSON.parse(data.gallery); } catch { data.gallery = data.gallery.split(",").map(x => x.trim()).filter(Boolean); }
  }
  return data;
}

exports.getProjects = asyncHandler(async (req, res) => {
  const { search, category, status, featured, page = 1, limit = 12 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (featured !== undefined) filter.featured = featured === "true";
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [projects, total] = await Promise.all([
    Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Project.countDocuments(filter)
  ]);

  success(res, {
    projects,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) }
  });
});

exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate("owner", "name email");
  if (!project) return fail(res, "Project not found.", 404);
  success(res, { project });
});

exports.getMyProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
  success(res, { projects });
});

exports.createProject = asyncHandler(async (req, res) => {
  const data = normalizeBody(req.body);
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  if (!data.owner && req.body.owner) data.owner = req.body.owner;
  const project = await Project.create(data);
  success(res, { project }, "Project created.", 201);
});

exports.updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return fail(res, "Project not found.", 404);

  Object.assign(project, normalizeBody(req.body));
  if (req.file) project.image = `/uploads/${req.file.filename}`;
  await project.save();

  success(res, { project }, "Project updated.");
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return fail(res, "Project not found.", 404);
  success(res, null, "Project deleted.");
});
