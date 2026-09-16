const router = require("express").Router();
const c = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

router.get("/", c.getJobs);
router.post("/general-apply", protect, upload.single("resume"), c.applyGeneral);
router.get("/applications/mine", protect, c.getMyApplications);
router.get("/applications/:id", protect, c.getApplicationById);
router.get("/admin/applications/all", protect, authorize("admin"), c.getAllApplications);
router.patch("/admin/applications/:id/status", protect, authorize("admin"), c.updateApplicationStatus);
router.delete("/admin/applications/:id", protect, authorize("admin"), c.deleteApplication);

router.get("/:id", c.getJobById);
router.post("/:id/apply", upload.single("resume"), c.apply);

router.post("/", protect, authorize("admin"), c.createJob);
router.put("/:id", protect, authorize("admin"), c.updateJob);
router.delete("/:id", protect, authorize("admin"), c.deleteJob);

module.exports = router;
