/* eslint-disable linebreak-style */
const express = require('express');

const saltRounds = 10;
const router = express.Router();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Login = require('../models/schema');

dotenv.config();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const user1 = new Login({
    name: req.body.name,
    mob: req.body.mob,
    email: req.body.email,
    password: req.body.password,
  });
  user1.password = await bcrypt.hash(user1.password, saltRounds);
  await Login.create(user1);
  res.redirect('/login');
});

module.exports = router;
