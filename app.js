const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/user.routers');
const authRouter = require('./routes/auth.routers');
const postRouter = require('./routes/post.routers');
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(morgan('combined'));

app.use(express.json());
//app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

//Custom express error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
  });
});

module.exports = app;
