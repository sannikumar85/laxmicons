const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: String, required: true, trim: true },
  subject: { type: String, default: "" },
  description: { type: String, required: true, trim: true },
  customerName: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  location: { type: String, default: "" },
  preferredDate: Date,
  budget: { type: Number, default: 0 },
  status: { type: String, enum: ["pending", "approved", "in-progress", "completed", "cancelled", "rejected"], default: "pending" },
  adminNote: { type: String, default: "" }
  ,assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
