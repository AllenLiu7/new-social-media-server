const User = require('../models/users.model');
const createError = require('http-errors');
const path = require('path');
const fs = require('fs');

//upload post image (/upload/post_image)
async function httpUploadImage(req, res, next) {
  const currentProfilePic = req.body.currentProfilePic;

  //delete current profile pic
  if (currentProfilePic) {
    const oldPath = path.resolve(
      '..',
      'server/public/assets/profile-pictures',
      currentProfilePic
    );

    fs.unlink(oldPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('oldPic deleted');
    });
  } //server\public\assets\profile-pictures\1.jpg

  try {
    return res.status(200).json({
      message: 'File uploded successfully',
      fileName: req.file.filename, //return the file name to frontend for handling
    });
  } catch (err) {
    next(createError(500, err));
  }
}

module.exports = {
  httpUploadImage,
};
