const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const priceRouter = require('./routes/price.js');
const loginRouter = require('./routes/login.js');
const registerRouter = require('./routes/register.js');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', indexRouter);
app.use('/api/price', priceRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
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
  res.render('error');
});

const http = require('http');

app.set('port', 3000);
 
const server = http.createServer(app);

server.listen(3000);

console.log("server started")