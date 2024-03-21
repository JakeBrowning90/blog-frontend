// const Reader = require('../models/reader');
const asyncHandler = require("express-async-handler");
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require('dotenv').config();

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const reader= await fetch(`http://localhost:3000/readers/?` + new URLSearchParams({
            email: username,
            // password: req.body.password,
        }), {mode: 'cors'});
        console.log(reader)
        // If user doesn't exist in DB
        if (!reader) {
          return done(null, false, { message: "Incorrect username" });
        };
        // const match = await bcrypt.compare(password, reader.password);
        // If password doesn't match 
        if (reader.password != req.body.password) {
            return done(null, false, { message: "Incorrect password" })
        }
        return done(null, reader);
      } catch(err) {
        return done(err);
      };
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });

exports.log_in_get = asyncHandler(async (req, res, next) => {
    res.render("reader_login", { 
        title: "Reader Log-In",
    });
});

exports.log_in_post = asyncHandler(async (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "readers/log-in"
    })
});

exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render('reader_create', { title: 'Sign-Up Form' });
});

exports.sign_up_post = asyncHandler(async (req, res, next) => {
    const response = await fetch('http://localhost:3000/readers/', {
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
        is_admin: false
        })
    })
    // return response.json();
    res.redirect('/');
});
