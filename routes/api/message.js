const express = require("express");
const router = express.Router();
const User = require("../../models/user");

router.get("/", function (req, res) {
  //get user
  res.json({
    message: `Hi ${req.user.name}, You've been decoded from then token`,
  });
});

module.exports = router;
