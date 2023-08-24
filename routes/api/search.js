const express = require('express');
const router = express.Router();
const searchCtrl = require('../../controllers/api/search');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, searchCtrl.search);

module.exports = router;