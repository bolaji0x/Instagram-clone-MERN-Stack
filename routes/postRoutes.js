const express = require('express')
const router = express.Router()

const {
    createPost,
    getAllPosts,
    getCurrentUserPost,
    getDiscoverPost,
    likePost,
    unlikePost,
    getSinglePost,
    updatePost,
    deletePost
} = require('../controllers/postController.js')


router.route('/').post(createPost).get(getCurrentUserPost)

   
router.route('/discover').get(getDiscoverPost)
router.route('/:id').get(getSinglePost)
router.route('/:id').delete(deletePost)
router.route('/account/:id').get(getAllPosts)

router.route('/:id').put(updatePost) 

router.route('/like/:id').patch(likePost)
router.route('/unlike/:id').patch(unlikePost)

module.exports = router

