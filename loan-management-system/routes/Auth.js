// routes/Auth.js

const express = require('express');
const { login, logout, refreshAccessToken } = require('../controllers/Auth')
const passport = require('passport')

const router = express.Router();

router.post('/login', login);
router.post('/logout', passport.authenticate('jwt', { session: false }), logout);
router.post('/refresh-token', refreshAccessToken);

module.exports = router;