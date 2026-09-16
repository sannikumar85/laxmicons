const router = require("express").Router();
const c = require("../controllers/projectController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

router.get("/", c.getProjects);
router.get("/mine", protect, c.getMyProjects);
router.get("/:id", c.getProjectById);

router.post("/", protect, authorize("admin"), upload.single("image"), c.createProject);
router.put("/:id", protect, authorize("admin"), upload.single("image"), c.updateProject);
router.delete("/:id", protect, authorize("admin"), c.deleteProject);

module.exports = router;
