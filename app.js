var express = require('express');
var router =express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs=require("fs");
var formidable=require("formidable");
var session=require("express-session");

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var list =require('./routes/list');
var add =require('./routes/add');
var xiang=require('./routes/gerenxinxi');
var gai=require('./routes/xiugai');
var tu=require('./routes/tupian');
var banji=require('./routes/banji');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'950108',name:'testap2',cookie:{maxAge:80000},resave:false,saveUninitialized:true}));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/list', list);
app.use('/add', add);
app.use('/geren', xiang);
app.use('/gai', gai);
app.use('/tu', tu);
app.use('/banji', banji);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
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
app.listen('3560',function(){
	console.log('server start......')
})
module.exports = app;
