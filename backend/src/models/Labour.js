const mongoose = require("mongoose");

const labourSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  skill: { type: String, required: true, trim: true },
  skills: [{ type: String }],
  location: { type: String, default: "" },
  experience: { type: Number, default: 0 },
  phone: { type: String, default: "" },
  image: { type: String, default: "" },
  availability: { type: String, enum: ["available", "busy", "unavailable"], default: "available" },
  description: { type: String, default: "" },
  workHistory: [{ type: String }],
  dailyRate: { type: Number, default: 0 }
}, { timestamps: true });

labourSchema.index({ name: "text", skill: "text", location: "text" });

module.exports = mongoose.model("Labour", labourSchema);
