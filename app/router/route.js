const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const love_controller = require("../controllers/love_controller");
const materi_controller = require("../controllers/materi_controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/do_you_love_sendiko?", love_controller.confession);
router.get("/materi", materi_controller.getMateri);
router.post("/materi", materi_controller.postMateri);
router.post("/materi/sub", materi_controller.postSubMateri);
router.get("/materi/:id", materi_controller.getDetailedMateri);

module.exports = router;
