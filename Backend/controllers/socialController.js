import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import Video from '../models/Video.js';

export const schedulePost = asyncHandler(async (req, res) => {
  const { videoId, platform, scheduledAt } = req.body;
  const post = await Post.create({ user: req.user._id, video: videoId, platform, scheduledAt });
  res.status(201).json(post);
});

export const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id }).populate('video');
  res.json(posts);
});

export const postNow = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new Error('Post not found');
  post.status = 'posted';
  await post.save();
  res.json(post);
});

export const bulkSchedulePosts = asyncHandler(async (req, res) => {
  const { posts } = req.body;
  if (!posts || !Array.isArray(posts)) throw new Error('Posts must be an array');

  const createdPosts = [];
  for (const p of posts) {
    const post = await Post.create({
      user: req.user._id,
      video: p.videoId,
      platform: p.platform,
      scheduledAt: p.scheduledAt
    });
    createdPosts.push(post);
  }
  res.status(201).json(createdPosts);
});
