const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const review = require('../models/review');


router.route('/register')
    .get(users.index)
    .post(catchAsync(users.createUser));

router.route('/login')
    .get(users.Login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.isLogged);

router.get('/logout', users.Logout)

module.exports = router;