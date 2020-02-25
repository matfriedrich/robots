const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('./bin/authentication');

const loginRouter = require('./routes/login');
const robotsRouter = require('./routes/robots');
const danceoffsRouter = require('./routes/danceoffs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/robots', robotsRouter);
app.use('/danceoffs', danceoffsRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('im sorry, theres been an error:' + err.message);
});

module.exports = app;
