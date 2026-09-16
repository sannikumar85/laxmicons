const router = require("express").Router();
const c = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", c.register);
router.post("/verify-email", c.verifyEmail);
router.post("/login", c.login);
router.get("/me", protect, c.me);
router.post("/forgot-password", c.forgotPassword);
router.post("/reset-password/:token", c.resetPassword);
router.put("/change-password", protect, c.changePassword);

module.exports = router;
