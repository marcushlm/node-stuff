var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var helmet = require('helmet');

var metrics = require('express-node-metrics')

var metricsMiddleware = metrics.middleware;

// models
var people = require('./model/people');

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var peopleRouter = require('./routes/people');

// db
//mongoose.connect('mongodb://localhost/express-test');

// express app
var app = express();
app.use(metricsMiddleware);

app.use('/', (req, res, next) => {
  let result = metrics.metrics.getAll(false);
  result = JSON.parse(result)
  res.send(result)
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// moount routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/people', peopleRouter);

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

module.exports = app;
