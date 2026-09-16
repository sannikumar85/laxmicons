const Labour = require("../models/Labour");
const LabourRequest = require("../models/LabourRequest");
const Notification = require("../models/Notification");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { notifyUser } = require("../utils/workflowNotification");

exports.getLabour = asyncHandler(async (req, res) => {
  const { search, skill, location, experience, availability } = req.query;
  const filter = {};
  if (skill) filter.skill = new RegExp(skill, "i");
  if (location) filter.location = new RegExp(location, "i");
  if (availability) filter.availability = availability;
  if (experience) filter.experience = { $gte: Number(experience) };
  if (search) filter.$or = [
    { name: new RegExp(search, "i") },
    { skill: new RegExp(search, "i") },
    { location: new RegExp(search, "i") }
  ];

  const labour = await Labour.find(filter).sort({ createdAt: -1 });
  success(res, { labour });
});

exports.getById = asyncHandler(async (req, res) => {
  const labour = await Labour.findById(req.params.id);
  if (!labour) return fail(res, "Labour profile not found.", 404);
  success(res, { labour });
});

exports.createRequest = asyncHandler(async (req, res) => {
  const labour = await Labour.findById(req.body.labourId);
  if (!labour) return fail(res, "Labour profile not found.", 404);

  const request = await LabourRequest.create({
    ...req.body,
    user: req.user._id,
    labour: labour._id,
    labourName: req.body.labourName || labour.name,
    skill: req.body.skill || labour.skill,
    workersRequired: Number(req.body.workersRequired)
  });

  await Notification.create({
    user: req.user._id,
    title: "Labour request submitted",
    message: `Your labour request for ${labour.name} has been submitted.`,
    type: "labour",
    link: "/dashboard/labour-requests"
  });

  success(res, { request }, "Labour request created.", 201);
});

exports.getMyRequests = asyncHandler(async (req, res) => {
  const requests = await LabourRequest.find({ user: req.user._id })
    .populate("labour", "name skill location phone")
    .sort({ createdAt: -1 });
  success(res, { requests });
});

exports.getRequestById = asyncHandler(async (req, res) => {
  const request = await LabourRequest.findOne({
    _id: req.params.id,
    ...(req.user.role === "admin" ? {} : { user: req.user._id })
  }).populate("labour", "name skill location phone");

  if (!request) return fail(res, "Labour request not found.", 404);
  success(res, { request });
});

exports.cancelRequest = asyncHandler(async (req, res) => {
  const request = await LabourRequest.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, status: { $in: ["pending", "approved"] } },
    { status: "cancelled" },
    { new: true }
  );
  if (!request) return fail(res, "Request cannot be cancelled.", 400);
  success(res, { request }, "Labour request cancelled.");
});

exports.getAllRequests = asyncHandler(async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const requests = await LabourRequest.find(filter)
    .populate("user", "name email phone")
    .populate("labour", "name skill location")
    .sort({ createdAt: -1 });
  success(res, { requests });
});

exports.updateRequestStatus = asyncHandler(async (req, res) => {
  const request = await LabourRequest.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, adminNote: req.body.adminNote || "" },
    { new: true, runValidators: true }
  );
  if (!request) return fail(res, "Labour request not found.", 404);

  await Notification.create({
    user: request.user,
    title: "Labour request updated",
    message: `Your labour request status is now ${request.status}.`,
    type: "labour",
    link: "/dashboard/labour-requests"
  });
  const user = await require("../models/User").findById(request.user).select("email name");
  await notifyUser({ user, subject: "Your Laxmi Construction labour request was updated", title: "Labour request updated", message: `Your labour request status is now ${request.status}.${request.adminNote ? ` Admin note: ${request.adminNote}` : ""}`, link: "/dashboard/labour-requests" });

  success(res, { request }, "Labour request updated.");
});

exports.createLabour = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.skills && typeof data.skills === "string") data.skills = data.skills.split(",").map(x => x.trim()).filter(Boolean);
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  data.experience = Number(data.experience) || 0;
  data.dailyRate = Number(data.dailyRate) || 0;
  const labour = await Labour.create(data);
  success(res, { labour }, "Labour profile created.", 201);
});

exports.updateLabour = asyncHandler(async (req, res) => {
  const labour = await Labour.findById(req.params.id);
  if (!labour) return fail(res, "Labour profile not found.", 404);
  const data = { ...req.body };
  if (data.skills && typeof data.skills === "string") data.skills = data.skills.split(",").map(x => x.trim()).filter(Boolean);
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  Object.assign(labour, data);
  await labour.save();
  success(res, { labour }, "Labour profile updated.");
});

exports.deleteLabour = asyncHandler(async (req, res) => {
  const labour = await Labour.findByIdAndDelete(req.params.id);
  if (!labour) return fail(res, "Labour profile not found.", 404);
  success(res, null, "Labour profile deleted.");
});
