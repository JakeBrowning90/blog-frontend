// const Reader = require('../models/reader');
const asyncHandler = require("express-async-handler");
const { format } = require("morgan");
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");

require('dotenv').config();

// Get reader login form
exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render("reader_login", { 
      title: "Reader Log-In",
  });
});

// Submit reader login form
exports.log_in_post = asyncHandler(async (req, res, next) => {
  await fetch('http://localhost:3000/readers/login', {
    method: "POST",
    mode: "cors",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: req.body.email,
      password: req.body.password,
    })
  })
  // return response.json();
  res.redirect('/');
});

// Get new reader sign-up form
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('reader_create', { title: 'Sign-Up Form' });
});

// Submit new reader format, POST new reader
exports.sign_up_post = asyncHandler(async (req, res, next) => {
  await fetch('http://localhost:3000/readers/', {
    method: "POST",
    mode: "cors",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    // is_admin: false
    })
  })
  // return response.json();
  res.redirect('/');
});
