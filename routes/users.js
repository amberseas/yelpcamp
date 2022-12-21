const express = require('express');
const router = express.Router({ mergeParams: true }); //because routes have separate params, and if we want to use params from main file we merge it
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { 
        failureFlash: true, 
        failureRedirect: '/login', 
        keepSessionInfo: true
        }), users.login);

router.get('/logout', users.logout);

module.exports = router;