const Comment = require('../models/Comment');
const Post = require('../models/Post');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const checkPermissions = require('../utils/checkPermissions');

const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body

    const post = await Post.findById(postId)
    if(!post) return res.status(400).json({msg: "This post does not exist."})


    const newComment = new Comment({
        createdBy: req.user.userId, content, postId
    })

    await Post.findOneAndUpdate({_id: postId}, {
        $push: {comments: newComment._id}
    }, {new: true})

    const comment = await newComment.save()

    res.status(StatusCodes.CREATED).json({ comment })

} catch (err) {
    return res.status(500).json({msg: err.message})
}
};

const getAllComments = async (req, res) => {
  const comments = await Comment.find({})

  res.status(StatusCodes.OK).json({ comments, count: comments.length });
};

module.exports = {
  createComment,
  getAllComments
};
