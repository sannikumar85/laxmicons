const mongoose = require("mongoose");

const labourRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  labour: { type: mongoose.Schema.Types.ObjectId, ref: "Labour", required: true },
  labourName: { type: String, default: "" },
  skill: { type: String, default: "" },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  workersRequired: { type: Number, required: true, min: 1 },
  startDate: { type: Date, required: true },
  duration: { type: String, default: "" },
  requirements: { type: String, default: "" },
  status: { type: String, enum: ["pending", "approved", "assigned", "in-progress", "completed", "cancelled", "rejected"], default: "pending" },
  adminNote: { type: String, default: "" }
  ,assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

module.exports = mongoose.model("LabourRequest", labourRequestSchema);
