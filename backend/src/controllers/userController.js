const User = require("../models/User");
const Notification = require("../models/Notification");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");

const sanitize = (u) => ({
  id: u._id, name: u.name, email: u.email, phone: u.phone,
  address: u.address, city: u.city, pincode: u.pincode, avatar: u.avatar,
  role: u.role, status: u.status, notificationPreferences: u.notificationPreferences
  ,emailVerified: u.emailVerified
});

exports.getProfile = asyncHandler(async (req, res) => success(res, { user: sanitize(req.user) }));

exports.updateProfile = asyncHandler(async (req, res) => {
  const allowed = ["name", "phone", "address", "city", "pincode"];
  allowed.forEach(key => {
    if (req.body[key] !== undefined) req.user[key] = req.body[key];
  });

  if (req.file) req.user.avatar = `/uploads/${req.file.filename}`;

  await req.user.save();
  success(res, { user: sanitize(req.user) }, "Profile updated successfully.");
});

exports.deleteAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  await Notification.deleteMany({ user: req.user._id });
  success(res, null, "Account deleted successfully.");
});

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  success(res, { notifications });
});

exports.markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { read: true },
    { new: true }
  );
  if (!notification) return fail(res, "Notification not found.", 404);
  success(res, { notification }, "Notification marked as read.");
});

exports.markAllNotificationsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
  success(res, null, "All notifications marked as read.");
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  await Notification.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  success(res, null, "Notification deleted.");
});

exports.updateNotificationPreferences = asyncHandler(async (req, res) => {
  req.user.notificationPreferences = {
    ...req.user.notificationPreferences?.toObject?.(),
    ...req.body
  };
  await req.user.save();
  success(res, { preferences: req.user.notificationPreferences }, "Notification preferences updated.");
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  success(res, { users });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return fail(res, "User not found.", 404);
  success(res, { user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return fail(res, "User not found.", 404);

  ["name", "phone", "address", "city", "pincode", "role", "status"].forEach(key => {
    if (req.body[key] !== undefined) user[key] = req.body[key];
  });
  await user.save();
  success(res, { user: user.toObject({ transform: (_, ret) => { delete ret.password; return ret; } }) }, "User updated.");
});

exports.updateUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return fail(res, "User not found.", 404);
  user.status = req.body.status;
  await user.save();
  success(res, { user }, "User status updated.");
});

exports.deleteUser = asyncHandler(async (req, res) => {
  if (String(req.params.id) === String(req.user._id)) return fail(res, "You cannot delete your own admin account.");
  await User.findByIdAndDelete(req.params.id);
  success(res, null, "User deleted.");
});
