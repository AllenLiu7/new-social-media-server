const express = require('express');
const postRouter = express.Router();
const {
  httpNewPost,
  httpLikePost,
  httpDeletePost,
  httpUpdatePost,
  httpCurrentUserPosts,
  httpTimelinePosts,
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
postRouter.get('/profile/:userId', httpCurrentUserPosts);
//get timeline posts
postRouter.get('/timeline/:userId', httpTimelinePosts);

module.exports = postRouter;
