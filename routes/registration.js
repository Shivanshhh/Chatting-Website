/* eslint-disable linebreak-style */
const express = require('express');

const saltRounds = 10;
const router = express.Router();
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const Login = require('../models/schema');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  const user1 = new Login({
    name: req.body.name,
    mob: req.body.mob,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
  });
  user1.password = await bcrypt.hash(user1.password, saltRounds);
  await Login.create(user1);
  const msg = {
    to: req.body.email,
    from: 'ptrtiwari@gmail.com',
    subject: 'Bored in the house',
    text: 'and in the house bored',
  };
  await sgMail.send(msg);
  res.redirect('/login');
});

router.get('/adminsignup', (req, res) => {
  res.render('adminsignup');
});

router.post('/adminsignup', async (req, res) => {
  const user2 = new Login({
    name: req.body.name,
    mob: req.body.mob,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
  });
  user2.password = await bcrypt.hash(user2.password, saltRounds);
  await Login.create(user2);
  res.redirect('/login');
});

module.exports = router;
