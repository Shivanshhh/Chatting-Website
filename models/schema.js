/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const loginschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
    trim: true,
  },
  mob: {
    type: Number,
    required: [true],
    trim: true,
  },
  email: {
    type: String,
    required: [true],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true],
    trim: true,
  },
});

const Login = mongoose.model('Login', loginschema);
module.exports = Login;