const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
// POST /api/users/change-password
router.put('/change-password', ensureLoggedIn, usersCtrl.changePassword);

// POST /api/users/add-friend/:userId
router.post('/add-friend/:userId', ensureLoggedIn, usersCtrl.addFriend);

// DELETE /api/users/remove-friend/:userId
router.delete('/remove-friend/:userId', ensureLoggedIn, usersCtrl.removeFriend);

module.exports = router;
