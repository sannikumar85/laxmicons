const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  department: { type: String, default: "" },
  location: { type: String, default: "" },
  type: { type: String, enum: ["Full Time", "Part Time", "Contract", "Internship"], default: "Full Time" },
  experience: { type: String, default: "Fresher" },
  salary: { type: String, default: "Not disclosed" },
  description: { type: String, default: "" },
  responsibilities: [{ type: String }],
  requirements: [{ type: String }],
  status: { type: String, enum: ["open", "closed", "draft"], default: "open" },
  postedAt: { type: Date, default: Date.now },
  closingDate: Date
}, { timestamps: true });

jobSchema.index({ title: "text", department: "text", location: "text" });

module.exports = mongoose.model("Job", jobSchema);
