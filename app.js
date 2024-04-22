var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

// const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

var indexRouter = require('./routes/index');
var readersRouter = require('./routes/readers');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(session({ secret: process.env.SESSION, resave: false, saveUninitialized: true }));
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  // res.locals.currentUser = localStorage.getItem('email');
  next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/readers', readersRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// var port = process.env.PORT || 3000;

// app.listen(port, function () {
//   console.log('Example app listening on port ' + port + '!');
// });

module.exports = app;
