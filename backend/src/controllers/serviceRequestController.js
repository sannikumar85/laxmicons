const ServiceRequest = require("../models/ServiceRequest");
const Notification = require("../models/Notification");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { notifyUser } = require("../utils/workflowNotification");

async function notify(user, title, message, link = "/dashboard/service-requests") {
  if (user) await Notification.create({ user, title, message, type: "service", link });
}

exports.create = asyncHandler(async (req, res) => {
  const data = { ...req.body, user: req.user._id, email: req.user.email };
  if (data.budget !== undefined) data.budget = Number(data.budget) || 0;
  const request = await ServiceRequest.create(data);
  await notify(req.user._id, "Service request submitted", `Your ${request.service} request has been submitted.`);
  success(res, { request }, "Service request created.", 201);
});

exports.getMine = asyncHandler(async (req, res) => {
  const requests = await ServiceRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
  success(res, { requests });
});

exports.getById = asyncHandler(async (req, res) => {
  const request = await ServiceRequest.findOne({
    _id: req.params.id,
    ...(req.user.role === "admin" ? {} : { user: req.user._id })
  }).populate("user", "name email phone");

  if (!request) return fail(res, "Service request not found.", 404);
  success(res, { request });
});

exports.cancel = asyncHandler(async (req, res) => {
  const request = await ServiceRequest.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, status: { $in: ["pending", "approved"] } },
    { status: "cancelled" },
    { new: true }
  );
  if (!request) return fail(res, "Request cannot be cancelled.", 400);
  success(res, { request }, "Service request cancelled.");
});

exports.getAll = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const requests = await ServiceRequest.find(filter).populate("user", "name email phone").sort({ createdAt: -1 });
  success(res, { requests });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const request = await ServiceRequest.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, adminNote: req.body.adminNote || "" },
    { new: true, runValidators: true }
  );
  if (!request) return fail(res, "Service request not found.", 404);
  const populated = await request.populate("user", "name email");
  const message = `Your service request status is now ${request.status}.${request.adminNote ? ` Admin note: ${request.adminNote}` : ""}`;
  await notify(populated.user?._id || request.user, "Service request updated", message);
  await notifyUser({ user: populated.user, subject: "Your Laxmi Construction service request was updated", title: "Service request updated", message, link: "/dashboard/service-requests" });
  success(res, { request }, "Service request updated.");
});

exports.remove = asyncHandler(async (req, res) => {
  const request = await ServiceRequest.findByIdAndDelete(req.params.id);
  if (!request) return fail(res, "Service request not found.", 404);
  success(res, null, "Service request deleted.");
});
