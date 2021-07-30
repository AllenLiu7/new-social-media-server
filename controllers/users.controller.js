const User = require('../models/users.model');
const createError = require('http-errors');

//get current user
async function httpGetUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    // if (!user) {
    //   return next(createError(400, 'User does not exist'));
    // }
    const { password, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return next(createError(500, err));
  }
}

//follow a user

async function httpFollowUser(req, res, next) {
  try {
    //user/:id/follow
    // defind current user and userTofollow
    const currentUser = User.findOne({ _id: req.params.id });
    const userToBefollow = User.findOne({ _id: req.body.userId });

    //push the currentUser to the userToFollow's follower array
    await userToBefollow.updateOne({
      $push: { followers: req.params.id },
    });

    //push the userTofollow's id to currenUser's following array
    await currentUser.updateOne({
      $push: { followings: req.body.userId },
    });

    res.status(200).json('user has been followed');
  } catch (err) {
    return next(createError(500, err));
  }
}

//unfollow a user
async function httpUnfollowUser(req, res, next) {
  try {
    const currentUser = User.findOne({ _id: req.params.id });
    const userToBeUnfollow = User.findOne({ _id: req.body.userId });

    await userToBeUnfollow.updateOne({
      $pull: { followers: req.params.id },
    });

    await currentUser.updateOne({
      $pull: { followings: req.body.userId },
    });

    res.status(200).json('user has been unfollowed');
  } catch (err) {
    return next(createError(500, err));
  }
}

//get current user's following users
async function httpGetFollowings(req, res, next) {
  try {
    const { followings } = await User.findOne({ _id: req.params.id });
    const followingUsersInfo = await User.find({ _id: { $in: followings } });
    res.status(200).json(followingUsersInfo);
  } catch (err) {
    return next(createError(500, err));
  }
}

//get current user's followers

//delete user
//update user

module.exports = {
  httpGetUser,
  httpFollowUser,
  httpUnfollowUser,
  httpGetFollowings,
};
