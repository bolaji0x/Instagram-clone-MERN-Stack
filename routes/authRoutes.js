const express = require('express')
const router = express.Router()

const rateLimiter = require('express-rate-limit')

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

const { 
  register,
  login,
  updateUser,
  getSingleUser,
  getCurrentUser,
  logout 
  
} = require('../controllers/authController.js')

const authenticateUser = require('../middleware/auth.js');

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.get('/logout', logout);

router.route('/updateUser').put(authenticateUser, updateUser)

router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/:id').get(getSingleUser)

module.exports = router
