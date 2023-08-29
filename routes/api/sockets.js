const express = require("express");
const router = express.Router();
const socketCtrl = require("../../controllers/api/sockets");

// PUT /api/socket
router.put("/", socketCtrl.updateSocket);

// POST /api/socket
router.post("/", socketCtrl.createSocket);

module.exports = router;
