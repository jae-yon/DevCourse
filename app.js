// 내장 모듈
var path = require('path');
var createError = require('http-errors');
// 외장 모듈
var logger = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var channelsRouter = require('./routes/channels');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// JSON 형태의 데이터를 해석하는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/channels', channelsRouter);

// 404(URL 오입력) 에러 발생시 에러 해들러로 넘김
app.use(function(req, res, next) {
  next(createError(404));
});

// 에러 핸들러
app.use(function(err, req, res, next) {
  // 개발 과정의 에러만 제공
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 에러 페이지 랜더링
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
