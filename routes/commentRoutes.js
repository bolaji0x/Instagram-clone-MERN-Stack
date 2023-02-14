const express = require('express');
const router = express.Router();

const {
  createComment,
  getAllComments
} = require('../controllers/commentController');



router.route('/').post(createComment).get(getAllComments);

module.exports = router;
