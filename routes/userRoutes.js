const express = require('express')
const router = express.Router()

const rateLimiter = require('express-rate-limit')
/*
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

*/
const {   
  followUser, 
  unfollowUser,
  searchUser
} = require('../controllers/userController.js')

router.route('/search').get(searchUser)

router.route('/follow/:id').patch(followUser)
router.route('/unfollow/:id').patch(unfollowUser)

module.exports = router
