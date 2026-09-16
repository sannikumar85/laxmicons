const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: "Construction" },
  location: { type: String, default: "" },
  client: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  gallery: [{ type: String }],
  status: { type: String, enum: ["planning", "ongoing", "completed", "on-hold"], default: "planning" },
  startDate: Date,
  endDate: Date,
  budget: { type: Number, default: 0 },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  featured: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

projectSchema.index({ title: "text", location: "text", category: "text", client: "text" });

module.exports = mongoose.model("Project", projectSchema);
