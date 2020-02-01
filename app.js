var compression = require('compression');
var express = require('express');
var path = require('path');
var request = require('request')

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/indexRouter');
var oldChart = require('./routes/oldChartRouter');
var mapPage = require('./routes/mapRouter');

var app = express();
app.use(compression());

app.disable('etag');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//console.log("__dirname" + __dirname);
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/share/', express.static(path.join(__dirname, 'public')));
// app.use('/share/post/**', express.static(path.join(__dirname, 'public')));
// app.use('/share/jump', express.static(path.join(__dirname, 'public')));
// app.use('/share/users', express.static(path.join(__dirname, 'public')));
// app.use('/share/user', express.static(path.join(__dirname, 'public')));
// app.use('/share/award', express.static(path.join(__dirname, 'public')));
// app.use('/share/admin', express.static(path.join(__dirname, 'public')));
// app.use('/share/admin/login', express.static(path.join(__dirname, 'public')));

app.get('/api_proxy/get', function (req, res) {
  var targetUrl = decodeURIComponent(req.query.url)
  var call = request.get(targetUrl, function (err, resp, body) {
    if (err) {
      res.status(call.status)
      res.send(err)
    } else {
      res.header('content-type', resp.headers['content-type'])
      res.send(body)
    }
  })
})


app.use('/map', mapPage);
app.use('/oldchart', oldChart);
app.use('/', index);

// app.use('/', function(req, res, next){
//   res.status(302);
//   // res.redirect("https://vuevideo.net");
//   res.end();
// });

app.set('port', 80);
app.listen(app.get('port'));
app.get('/alive', function (req, res) {
  res.status(200);
  res.write("hello s3");
  res.end();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});
// }

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
