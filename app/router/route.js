const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const love_controller = require("../controllers/love_controller");
const materi_controller = require("../controllers/materi_controller");
const video_controller = require("../controllers/video_controller");
const road_to_safety_controller = require("../controllers/road_to_safety_controller");
const history_controller = require("../controllers/history_controller");
const mentoring_controller = require("../controllers/mentoring_controller");
const payment_controller = require("../controllers/payment_controller");
const { authenticate } = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", userController.getProfile);

router.post("/do_you_love_sendiko?", love_controller.confession);
router.get("/materi", authenticate, materi_controller.getMateri);
router.post("/materi", authenticate, materi_controller.postMateri);
router.get("/materi/:id", authenticate, materi_controller.getDetailedMateri);
router.put("/materi/:id", authenticate, materi_controller.updateMateri);
router.delete("/materi/:id", authenticate, materi_controller.deleteMateri);

router.post("/materi/sub", authenticate, materi_controller.postSubMateri);
router.put("/materi/sub/:id", authenticate, materi_controller.updateSubMateri);
router.delete(
  "/materi/sub/:id",
  authenticate,
  materi_controller.deleteSubMateri
);

router.get("/videos", authenticate, video_controller.index);
router.post("/video", authenticate, video_controller.create);
router.put("/video/:id", authenticate, video_controller.update);
router.delete("/video/:id", authenticate, video_controller.delete);

router.get("/road", authenticate, road_to_safety_controller.index);
router.get("/road/:id", authenticate, road_to_safety_controller.show);
router.post("/road", authenticate, road_to_safety_controller.create);
router.put("/road/:id", authenticate, road_to_safety_controller.update);
router.delete("/road/:id", authenticate, road_to_safety_controller.delete);

router.get("/history", authenticate, history_controller.index);
router.get("/history/:id", authenticate, history_controller.show);
router.post("/history", authenticate, history_controller.create);
router.put("/history/:id", authenticate, history_controller.update);
router.delete("/history/:id", authenticate, history_controller.delete);

router.get("/mentoring/:id", authenticate, mentoring_controller.show);
router.post("/mentoring", authenticate, mentoring_controller.create);
router.put("/mentoring/:id", authenticate, mentoring_controller.update);
router.delete("/mentoring/:id", authenticate, mentoring_controller.delete);

router.get("/payment", authenticate, payment_controller.index);
router.get("/payment/:id", authenticate, payment_controller.show);
router.post("/payment", authenticate, payment_controller.create);
router.put("/payment/:id", authenticate, payment_controller.update);
router.delete("/payment/:id", authenticate, payment_controller.delete);

module.exports = router;
