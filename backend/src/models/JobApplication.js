const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null },
  customPosition: { type: String, default: "" },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  coverLetter: { type: String, default: "" },
  resume: { type: String, default: "" },
  status: { type: String, enum: ["applied", "under-review", "shortlisted", "rejected", "selected"], default: "applied" }
  ,adminNote: { type: String, default: "" }
  ,reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

jobApplicationSchema.index({ job: 1, email: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
