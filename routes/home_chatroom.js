/* eslint-disable linebreak-style */
const express = require('express');
const Login = require('../models/schema');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.render('login');
  } else {
    next();
  }
};

router.get('/chatroom', redirectLogin, async (req, res) => {
  const user = await Login.findOne({ email: req.session.userId });
  res.render('index', { user1: user });
});

module.exports = router;
