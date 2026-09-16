const ContactMessage = require("../models/ContactMessage");
const { sendMail } = require("../config/mail");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");

exports.create = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) return fail(res, "Name, email and message are required.");

  const contact = await ContactMessage.create({ name, email, phone, subject, message });

  if (process.env.ADMIN_EMAIL) {
    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: subject ? `Website contact: ${subject}` : "New website contact message",
      text: `${name} (${email})\n${phone || ""}\n\n${message}`
    });
  }

  success(res, { contact }, "Your message has been sent successfully.", 201);
});

exports.getAll = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  success(res, { messages });
});

exports.getById = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) return fail(res, "Contact message not found.", 404);
  success(res, { message });
});

exports.markRead = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id, { status: "read" }, { new: true }
  );
  if (!message) return fail(res, "Contact message not found.", 404);
  success(res, { message }, "Message marked as read.");
});

exports.remove = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) return fail(res, "Contact message not found.", 404);
  success(res, null, "Message deleted.");
});
