const router = require("express").Router();
const c = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

router.use(protect);

router.get("/me", c.getProfile);
router.put("/me", upload.single("avatar"), c.updateProfile);
router.delete("/me", c.deleteAccount);

router.get("/notifications", c.getNotifications);
router.patch("/notifications/:id/read", c.markNotificationRead);
router.patch("/notifications/read-all", c.markAllNotificationsRead);
router.delete("/notifications/:id", c.deleteNotification);
router.patch("/notification-preferences", c.updateNotificationPreferences);

router.get("/", authorize("admin"), c.getAllUsers);
router.get("/:id", authorize("admin"), c.getUserById);
router.put("/:id", authorize("admin"), c.updateUser);
router.patch("/:id/status", authorize("admin"), c.updateUserStatus);
router.delete("/:id", authorize("admin"), c.deleteUser);

module.exports = router;
