const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const userRouter = require('./routes/user.routers');
const authRouter = require('./routes/auth.routers');
const postRouter = require('./routes/post.routers');
const uploadRouter = require('./routes/upload.router');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/upload', uploadRouter);
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//Custom express error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
  });
});

module.exports = app;
