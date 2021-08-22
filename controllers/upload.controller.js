const User = require('../models/users.model');
const createError = require('http-errors');

//upload post image (/upload/post_image)
async function httpUploadImage(req, res, next) {
  try {
    return res.status(200).json({
      message: 'File uploded successfully',
      fileName: req.file.filename, //return the file name to frontend for handling
    });
  } catch (error) {
    next(createError(500, err));
  }
}

module.exports = {
  httpUploadImage,
};
