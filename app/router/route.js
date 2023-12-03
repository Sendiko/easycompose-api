const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const love_controller = require("../controllers/love_controller");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post('/do_you_love_sendiko?', love_controller.confession);

module.exports = router;
