const express = require("express");
const router = express.Router();
const messagesCtrl = require("../../controllers/api/messages");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, messagesCtrl.indexMessage);

router.post("/", ensureLoggedIn, messagesCtrl.addMessage);

module.exports = router;
