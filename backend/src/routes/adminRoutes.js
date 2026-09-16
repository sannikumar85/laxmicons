const router = require("express").Router();
const c = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect, authorize("admin"));

router.get("/stats", c.stats);
router.get("/dashboard", c.dashboard);
router.get("/settings", c.settings);
router.put("/settings", c.updateSettings);

module.exports = router;
