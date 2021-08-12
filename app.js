const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const userRouter = require('./routes/user.routers');
const authRouter = require('./routes/auth.routers');
const postRouter = require('./routes/post.routers');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
  // filename: (req, file, cb) => {
  //   //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //   cb(null, file.originalname);
  // },
});

const upload = multer({ storage: storage });
app.post('/api/post_image', upload.single('file'), function (req, res, next) {
  try {
    return res.status(200).json('File uploded successfully');
  } catch (error) {
    next(createError(500, err));
  }
});

//Custom express error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
  });
});

module.exports = app;
