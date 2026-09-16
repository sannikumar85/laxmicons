const router = require("express").Router();
const c = require("../controllers/labourController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

router.get("/", c.getLabour);
router.post("/requests", protect, c.createRequest);
router.get("/requests/mine", protect, c.getMyRequests);
router.get("/requests/:id", protect, c.getRequestById);
router.patch("/requests/:id/cancel", protect, c.cancelRequest);

router.get("/admin/requests", protect, authorize("admin"), c.getAllRequests);
router.patch("/admin/requests/:id/status", protect, authorize("admin"), c.updateRequestStatus);

router.post("/admin", protect, authorize("admin"), upload.single("image"), c.createLabour);
router.put("/admin/:id", protect, authorize("admin"), upload.single("image"), c.updateLabour);
router.delete("/admin/:id", protect, authorize("admin"), c.deleteLabour);

router.get("/:id", c.getById);

module.exports = router;
