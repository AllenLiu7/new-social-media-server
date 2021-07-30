const express = require('express');
const postRouter = express.Router();
const {
  httpNewPost,
  httpLikePost,
  httpDeletePost,
  httpUpdatePost,
  httpCurrentUserPosts,
  httpFollowingPosts,
} = require('../controllers/post.controller');

//create new post
postRouter.post('/', httpNewPost);
//update a post
postRouter.put('/:id', httpUpdatePost);
//like/unlike a post
postRouter.put('/:id/like', httpLikePost);
//delete a post
postRouter.delete('/:id/delete', httpDeletePost);
//get currentUser's posts
postRouter.get('/timeline/:userId', httpCurrentUserPosts);
//get following's posts
postRouter.get('/followings/:userId', httpFollowingPosts);

module.exports = postRouter;
