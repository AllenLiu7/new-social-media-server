const Post = require('../models/posts.model');
const User = require('../models/users.model');
const createError = require('http-errors');

//:id is for post id

//create new post (/post/)
async function httpNewPost(req, res, next) {
  try {
    //add a post
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    next(createError(500, err));
  }
}

//update a post (/post/:id)
async function httpUpdatePost(req, res, next) {
  try {
    await Post.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    return res.status(200).json('you update your post');
  } catch (err) {
    next(createError(500, err));
  }
}

//like/unlike a post (/post/:id/like)
async function httpLikePost(req, res, next) {
  try {
    const post = await Post.findById({ _id: req.params.id });
    //check if the user already liked the post. Pull the user if true
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json('You unlike the post!');
    }
    //push the currentUser to the like array
    await post.updateOne({ $push: { likes: req.body.userId } });

    return res.status(200).json('You like the post!');
  } catch (err) {
    return next(createError(500, err));
  }
}

//delete a post
async function httpDeletePost(req, res, next) {
  try {
    await Post.find({ _id: req.params.id }).remove().exec();
    return res.status(200).json('You delete your post');
  } catch (err) {
    return next(createError(500, err));
  }
}

//get user's posts (/post/profile/:userId)
async function httpCurrentUserPosts(req, res, next) {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    next(creatError(500, err));
  }
}

//get all related posts (/post/timeline/:userId)
async function httpTimelinePosts(req, res, next) {
  try {
    const currentUser = await User.findOne({ _id: req.params.userId });
    const followingUsers = currentUser.followings;
    const userPosts = await Post.find({ userId: req.params.userId });
    const followingPosts = await Post.find({ userId: { $in: followingUsers } });
    res.status(200).json(userPosts.concat(...followingPosts));
  } catch (err) {
    next(createError(500, err));
  }
}

module.exports = {
  httpNewPost,
  httpLikePost,
  httpDeletePost,
  httpUpdatePost,
  httpCurrentUserPosts,
  httpTimelinePosts,
};
