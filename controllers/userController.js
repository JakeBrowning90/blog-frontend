const asyncHandler = require("express-async-handler");
const { format } = require("morgan");
const api = require("./apiURLController");
// const { body, validationResult } = require("express-validator");

require('dotenv').config();

// Get new reader sign-up form
exports.sign_up_get = asyncHandler(async (req, res, next) => {  
  if (localStorage.getItem('token')) {
    res.redirect('/');
  } else {
    res.render('reader_create', { 
      title: 'Sign-Up Form' 
    });
  }
});

// Submit new reader format, POST new reader
exports.sign_up_post = asyncHandler(async (req, res, next) => {
  const response = await fetch(api.address + "users", {
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
    confirm_password: req.body.confirm_password,
    })
  })
  const signupResponse = await response.json();
  if (Array.isArray(signupResponse)) {
    res.render('reader_create', { 
      title: 'Sign-Up Form',
      errors: signupResponse,
      readerDetail: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      }
    });
  } else {
    res.redirect('/users/log-in');
  }
});


// Get reader login form
exports.log_in_get = asyncHandler(async (req, res, next) => {
  if (localStorage.getItem('token')) {
    res.redirect('/');
  } else {
    res.render("reader_login", { 
      title: "Reader Log-In",
    });
  }
});

// Submit reader login form
exports.log_in_post = asyncHandler(async (req, res, next) => {
  const response = await fetch(api.address + 'users/login', { 
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
   
  if (response.status == 401) {
    res.render("reader_login", { 
      title: "Reader Log-In",
      errorMessage: "Incorrect email / password"
    });
  } else {
    const loginResponse = await response.json();
    // Save user info to localStorage
    localStorage.setItem('full_name', loginResponse.full_name);
    localStorage.setItem('isAuthor', loginResponse.isAuthor);
    localStorage.setItem('id', loginResponse.id);
    localStorage.setItem('token', "Bearer " + loginResponse.token);
    res.redirect('/');
  }
});

exports.log_out = asyncHandler(async (req, res, next) => {
  localStorage.clear();
  res.redirect('/');
});

