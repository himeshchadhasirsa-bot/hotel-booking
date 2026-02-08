import Blog from '../models/Blog.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = asyncHandler(async (req, res) => {
  const { search, category, page = 1, limit = 10, featured } = req.query;

  const query = { isPublished: true };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) {
    query.category = category;
  }

  if (featured === 'true') {
    query.featured = true;
  }

  const skip = (page - 1) * limit;

  const blogs = await Blog.find(query)
    .populate('author', 'name email')
    .sort({ publishedAt: -1 })
    .limit(Number(limit))
    .skip(skip)
    .select('-comments');

  const total = await Blog.countDocuments(query);

  res.json({
    success: true,
    count: blogs.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: blogs
  });
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
export const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('author', 'name email avatar')
    .populate('comments.user', 'name avatar');

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Increment views
  blog.views += 1;
  await blog.save();

  res.json({
    success: true,
    data: blog
  });
});

// @desc    Get blog by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
    .populate('author', 'name email avatar')
    .populate('comments.user', 'name avatar');

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Increment views
  blog.views += 1;
  await blog.save();

  res.json({
    success: true,
    data: blog
  });
});

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = asyncHandler(async (req, res) => {
  req.body.author = req.user.id;

  const blog = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    data: blog
  });
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = asyncHandler(async (req, res) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Check if user is author or admin
  if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update this blog');
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json({
    success: true,
    message: 'Blog updated successfully',
    data: blog
  });
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Check if user is author or admin
  if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this blog');
  }

  await blog.deleteOne();

  res.json({
    success: true,
    message: 'Blog deleted successfully'
  });
});

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Private
export const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  const comment = {
    user: req.user.id,
    text
  };

  blog.comments.push(comment);
  await blog.save();

  await blog.populate('comments.user', 'name avatar');

  res.status(201).json({
    success: true,
    message: 'Comment added successfully',
    data: blog.comments
  });
});

// @desc    Delete comment
// @route   DELETE /api/blogs/:id/comments/:commentId
// @access  Private
export const deleteComment = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  const comment = blog.comments.id(req.params.commentId);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  // Check if user owns comment or is admin
  if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this comment');
  }

  comment.deleteOne();
  await blog.save();

  res.json({
    success: true,
    message: 'Comment deleted successfully'
  });
});

// @desc    Like blog
// @route   PUT /api/blogs/:id/like
// @access  Private
export const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  blog.likes += 1;
  await blog.save();

  res.json({
    success: true,
    message: 'Blog liked',
    likes: blog.likes
  });
});

// @desc    Get blog categories
// @route   GET /api/blogs/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Blog.distinct('category');

  res.json({
    success: true,
    data: categories
  });
});
