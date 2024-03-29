const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const priceRouter = require('./routes/price.js');
const authRouter = require('./routes/auth.js');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const app = express();


app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());

app.use('/api/', indexRouter);
app.use('/api/price', priceRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send();
  // res.render('error');
});

const http = require('http');

app.set('port', 3000);
 
const server = http.createServer(app);

server.listen(3000);

console.log("server started")