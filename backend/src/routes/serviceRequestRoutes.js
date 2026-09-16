const router = require("express").Router();
const c = require("../controllers/serviceRequestController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);
router.post("/", c.create);
router.get("/mine", c.getMine);
router.get("/:id", c.getById);
router.patch("/:id/cancel", c.cancel);

router.get("/", authorize("admin"), c.getAll);
router.patch("/:id/status", authorize("admin"), c.updateStatus);
router.delete("/:id", authorize("admin"), c.remove);

module.exports = router;
