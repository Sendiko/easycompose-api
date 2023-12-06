const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const love_controller = require("../controllers/love_controller");
const materi_controller = require("../controllers/materi_controller");
const video_controller = require("../controllers/video_controller");
const road_to_safety_controller = require("../controllers/road_to_safety_controller");
const history_controller = require("../controllers/history_controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", userController.getProfile);

router.post("/do_you_love_sendiko?", love_controller.confession);
router.get("/materi", materi_controller.getMateri);
router.post("/materi", materi_controller.postMateri);
router.get("/materi/:id", materi_controller.getDetailedMateri);
router.put("/materi/:id", materi_controller.updateMateri);
router.delete("/materi/:id", materi_controller.deleteMateri);

router.post("/materi/sub", materi_controller.postSubMateri);
router.put("/materi/sub/:id", materi_controller.updateSubMateri);
router.delete("/materi/sub/:id", materi_controller.deleteSubMateri);

router.get("/videos", video_controller.index);
router.post("/video", video_controller.create);
router.put("/video/:id", video_controller.update);
router.delete("/video/:id", video_controller.delete);

router.get("/road", road_to_safety_controller.index);
router.get("/road/:id", road_to_safety_controller.show);
router.post("/road", road_to_safety_controller.create);
router.put("/road/:id", road_to_safety_controller.update);
router.delete("/road/:id", road_to_safety_controller.delete);

router.get("/history", history_controller.index);
router.get("/history/:id", history_controller.show);
router.post("/history", history_controller.create);
router.put("/history/:id", history_controller.update);
router.delete("/history/:id", history_controller.delete);

module.exports = router;
