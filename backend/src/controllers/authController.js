const crypto = require("crypto");
const User = require("../models/User");
const Notification = require("../models/Notification");
const { signToken } = require("../utils/jwt");
const { sendMail } = require("../config/mail");
const { success, fail } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  city: user.city,
  pincode: user.pincode,
  avatar: user.avatar,
  role: user.role,
  status: user.status,
  emailVerified: user.emailVerified,
  notificationPreferences: user.notificationPreferences
});

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) return fail(res, "Name, email and password are required.");

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return fail(res, "An account with this email already exists.", 409);

  const user = await User.create({ name, email, password, phone });
  const verificationCode = String(crypto.randomInt(100000, 1000000));
  user.emailVerificationToken = crypto.createHash("sha256").update(verificationCode).digest("hex");
  user.emailVerificationExpires = Date.now() + 15 * 60 * 1000;
  await user.save();
  await sendMail({ to: user.email, subject: "Verify your Laxmi Construction email", text: `Your verification code is ${verificationCode}. It expires in 15 minutes.`, html: `<p>Your verification code is:</p><h2>${verificationCode}</h2><p>This code expires in 15 minutes.</p>` });
  await Notification.create({
    user: user._id,
    title: "Welcome to Laxmi Construction",
    message: "Your account has been created successfully.",
    type: "account"
  });

  return success(res, { user: publicUser(user), verificationCode: process.env.NODE_ENV === "production" ? undefined : verificationCode }, "Registration successful. Check your email to verify your account.", 201);
});

exports.verifyEmail = asyncHandler(async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const code = String(req.body.code || "").trim();
  const hashed = crypto.createHash("sha256").update(code).digest("hex");
  const user = await User.findOne({ email, emailVerificationToken: hashed, emailVerificationExpires: { $gt: Date.now() } });
  if (!user) return fail(res, "Verification code is invalid or expired.", 400);
  user.emailVerified = true; user.emailVerificationToken = null; user.emailVerificationExpires = null; await user.save();
  success(res, { user: publicUser(user), token: signToken(user) }, "Email verified successfully.");
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return fail(res, "Email and password are required.");

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return fail(res, "Invalid email or password.", 401);
  }

  if (user.status !== "active") return fail(res, "Your account is blocked.", 403);
  if (user.role !== "admin" && !user.emailVerified) {
    return fail(res, "Please verify your email before logging in.", 403);
  }

  return success(res, { user: publicUser(user), token: signToken(user) }, "Login successful.");
});

exports.me = asyncHandler(async (req, res) => {
  success(res, { user: publicUser(req.user) });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const email = String(req.body.email || "").toLowerCase().trim();
  const user = await User.findOne({ email });

  if (!user) return success(res, null, "If the account exists, a reset link will be sent.");

  const rawToken = String(crypto.randomInt(100000, 1000000));
  user.resetPasswordToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  const frontend = process.env.CLIENT_URL?.split(",")[0] || "http://localhost:5173";
  const resetUrl = `${frontend}/reset-password/${rawToken}`;

  await sendMail({
    to: user.email,
    subject: "Laxmi Construction password reset",
    text: `Your Laxmi Construction password reset verification code is ${rawToken}. It expires in 15 minutes. Open this link after receiving the code: ${resetUrl}`,
    html: `<p>Your password reset verification code is:</p><p style="font-size:24px;font-weight:bold;letter-spacing:6px">${rawToken}</p><p>This code expires in 15 minutes.</p><p><a href="${resetUrl}">Continue to reset password</a></p>`
  });

  if (process.env.NODE_ENV !== "production") {
    return success(res, { resetUrl, verificationCode: rawToken }, "Password reset verification code generated.");
  }

  success(res, null, "If the account exists, a reset link will be sent.");
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const hashed = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: Date.now() }
  }).select("+password");

  if (!user) return fail(res, "Reset token is invalid or expired.", 400);

  if (!req.body.password || req.body.password.length < 6) {
    return fail(res, "Password must contain at least 6 characters.");
  }

  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  success(res, { token: signToken(user), user: publicUser(user) }, "Password reset successful.");
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.comparePassword(currentPassword))) {
    return fail(res, "Current password is incorrect.", 400);
  }

  user.password = newPassword;
  await user.save();

  success(res, null, "Password changed successfully.");
});
