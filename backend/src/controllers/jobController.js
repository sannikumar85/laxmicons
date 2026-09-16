const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");
const Notification = require("../models/Notification");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { notifyUser } = require("../utils/workflowNotification");

function parseLists(data) {
  for (const key of ["responsibilities", "requirements"]) {
    if (data[key] && typeof data[key] === "string") {
      try { data[key] = JSON.parse(data[key]); }
      catch { data[key] = data[key].split("\n").map(x => x.trim()).filter(Boolean); }
    }
  }
  return data;
}

exports.getJobs = asyncHandler(async (req, res) => {
  const { search, status = "open" } = req.query;
  const filter = {};
  if (status && status !== "all") filter.status = status;
  if (search) filter.$text = { $search: search };
  const jobs = await Job.find(filter).sort({ postedAt: -1 });
  success(res, { jobs });
});

exports.getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return fail(res, "Job not found.", 404);
  success(res, { job });
});

exports.createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(parseLists({ ...req.body }));
  success(res, { job }, "Job created.", 201);
});

exports.updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return fail(res, "Job not found.", 404);
  Object.assign(job, parseLists({ ...req.body }));
  await job.save();
  success(res, { job }, "Job updated.");
});

exports.deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) return fail(res, "Job not found.", 404);
  await JobApplication.deleteMany({ job: job._id });
  success(res, null, "Job deleted.");
});

exports.apply = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job || job.status !== "open") return fail(res, "Job is not open for applications.", 400);

  const email = req.user?.email || req.body.email;
  if (!email) return fail(res, "Email is required.");

  const existing = await JobApplication.findOne({ job: job._id, email: email.toLowerCase() });
  if (existing) return fail(res, "You have already applied for this job.", 409);

  const application = await JobApplication.create({
    user: req.user?._id || null,
    job: job._id,
    applicantName: req.body.applicantName || req.user?.name,
    email: email.toLowerCase(),
    phone: req.body.phone || req.user?.phone || "",
    coverLetter: req.body.coverLetter || "",
    resume: req.file ? `/uploads/${req.file.filename}` : (req.body.resume || "")
  });

  if (req.user) {
    await Notification.create({
      user: req.user._id,
      title: "Job application submitted",
      message: `Your application for ${job.title} has been submitted.`,
      type: "job",
      link: "/dashboard/job-applications"
    });
  }

  success(res, { application }, "Application submitted.", 201);
});

exports.applyGeneral = asyncHandler(async (req, res) => {
  const email = req.user?.email || String(req.body.email || "").trim().toLowerCase();
  if (!email || !req.body.customPosition) return fail(res, "Email and desired position are required.");
  const application = await JobApplication.create({
    user: req.user?._id || null,
    customPosition: req.body.customPosition,
    applicantName: req.body.applicantName || req.user?.name,
    email,
    phone: req.body.phone || req.user?.phone || "",
    coverLetter: req.body.coverLetter || "",
    resume: req.file ? `/uploads/${req.file.filename}` : ""
  });
  if (req.user) await Notification.create({ user: req.user._id, title: "General job application submitted", message: `Your application for ${application.customPosition} has been submitted.`, type: "job", link: "/dashboard/job-applications" });
  success(res, { application }, "Application submitted.", 201);
});

exports.getMyApplications = asyncHandler(async (req, res) => {
  const applications = await JobApplication.find({
    $or: [{ user: req.user._id }, { email: req.user.email }]
  }).populate("job").sort({ createdAt: -1 });
  success(res, { applications });
});

exports.getApplicationById = asyncHandler(async (req, res) => {
  const filter = req.user.role === "admin"
    ? { _id: req.params.id }
    : { _id: req.params.id, $or: [{ user: req.user._id }, { email: req.user.email }] };

  const application = await JobApplication.findOne(filter).populate("job").populate("user", "name email phone");
  if (!application) return fail(res, "Application not found.", 404);
  success(res, { application });
});

exports.getAllApplications = asyncHandler(async (req, res) => {
  const applications = await JobApplication.find()
    .populate("job", "title department")
    .populate("user", "name email phone")
    .sort({ createdAt: -1 });
  success(res, { applications });
});

exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await JobApplication.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  ).populate("job");

  if (!application) return fail(res, "Application not found.", 404);

  if (application.user) {
    await Notification.create({
      user: application.user,
      title: "Job application updated",
      message: `Your application status is now ${application.status}.`,
      type: "job",
      link: "/dashboard/job-applications"
    });
    const user = await require("../models/User").findById(application.user).select("email name");
    await notifyUser({ user, subject: "Your Laxmi Construction job application was updated", title: "Job application updated", message: `Your application status is now ${application.status}.`, link: "/dashboard/job-applications" });
  }

  success(res, { application }, "Application status updated.");
});

exports.deleteApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findByIdAndDelete(req.params.id);
  if (!application) return fail(res, "Application not found.", 404);
  success(res, null, "Application deleted.");
});
