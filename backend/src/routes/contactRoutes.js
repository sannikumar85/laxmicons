const router = require("express").Router();
const c = require("../controllers/contactController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", c.create);

router.use(protect, authorize("admin"));
router.get("/", c.getAll);
router.get("/:id", c.getById);
router.patch("/:id/read", c.markRead);
router.delete("/:id", c.remove);

module.exports = router;
