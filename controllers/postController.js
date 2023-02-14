const Post = require('../models/Post.js')
const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const cloudinary = require("cloudinary");
const CustomError = require('../errors')
const checkPermissions = require('../utils/checkPermissions')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const createPost = async (req, res) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload_large(images[i], {
      folder: "products",
      chunk_size: 6000000,
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.createdBy = req.user.userId;

  const post = await Post.create(req.body);

  res.status(201).json({post});
}

const getCurrentUserPost = async (req, res) => {
    const { sort } = req.query
    const queryObject = {
      createdBy: req.user.userId,
    }

    let result = Post.find(queryObject)
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    
    // setup pagination
    const page = Number(req.query.page) * 1 || 1;
    const limit = Number(req.query.limit) * 1 || 6;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const posts = await result;

    const totalPosts = await Post.countDocuments(queryObject);
    res.status(StatusCodes.OK).json({ posts, totalPosts })
}


const getAllPosts = async (req, res) => {
  const { sort } = req.query
  const queryObject = {
    createdBy: req.params.id,
  }

  let result = Post.find(queryObject).populate('createdBy', '_id username')
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    
    // setup pagination
    const page = Number(req.query.page) * 1 || 1;
    const limit = Number(req.query.limit) * 1 || 6;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const posts = await result;

    const totalPosts = await Post.countDocuments(queryObject);
    res.status(StatusCodes.OK).json({ posts, totalPosts })

}


const getDiscoverPost = async (req, res) => {
  Post.find({ createdBy: { $in: req.user.following } })
  .populate('createdBy', '_id username images')
	.populate({
    path: 'comments', 
    populate: {
      path: 'createdBy content',
      select: '-password -email -followers -fullname -location -following'

    }
  })
		.sort("-createdAt")
		.then((data) => {
			let posts = [];
			data.map((item) => {
				posts.push({
					_id: item._id,
					images: item.images,
          description: item.description,
					likes: item.likes,
          createdBy: item.createdBy,
          comments: item.comments
				});
			});
			res.status(StatusCodes.OK).json({ posts })
		})
}


const likePost = async (req, res) => {
  const {id: postId} = req.params
  const userAlreadyLikedPost = await Post.find({_id: postId, likes: req.user.userId})
  if(userAlreadyLikedPost.length > 0) return res.status(StatusCodes.OK).json({msg: "You Already liked this post."})

  const post = await Post.findOneAndUpdate({_id: postId}, {
      $push: {likes: req.user.userId}
  }, {new: true})

  if(!post) return res.status(StatusCodes.NOT_FOUND).json({msg: 'This post does not exist.'})

  res.status(StatusCodes.OK).json({ post })
}

const unlikePost = async (req, res) => {
  const {id: postId} = req.params
  const post = await Post.findOneAndUpdate({_id: postId}, {
    $pull: {likes: req.user.userId}
  }, {new: true})

  if(!post) return res.status(StatusCodes.NOT_FOUND).json({msg: 'This post does not exist.'})

  res.status(StatusCodes.OK).json({ post })
  }

const getSinglePost = async (req, res) => {
  const {id: postId} = req.params
  const post = await Post.findOne({ _id: postId })
    .populate('createdBy', '_id username images')
    .populate({
      path: 'comments', 
      populate: {
        path: 'createdBy content',
        select: '-password -email -followers -fullname -location -following'

      }
    })

  if (!post) {
    throw new CustomError.NotFoundError(`No post with id : ${postId}`);
  }

  res.status(StatusCodes.OK).json({ post });    
}

const updatePost = async (req, res) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    throw new CustomError.NotFoundError("Post not found");
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < post.images.length; i++) {
      await cloudinary.v2.uploader.destroy(post.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "posts",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    post,
  });
}

const deletePost = async (req, res) => {
  const { id: postId } = req.params

  const post = await Post.findOne({ _id: postId })

  if (!post) {
    throw new CustomError.NotFoundError(`No post with id :${postId}`)
  }

  checkPermissions(req.user, post.createdBy)

  await post.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Post removed' })
}


module.exports = {
    createPost,
    getAllPosts,
    getCurrentUserPost,
    getSinglePost,
    updatePost,
    deletePost,
    getDiscoverPost,
    likePost,
    unlikePost
}

