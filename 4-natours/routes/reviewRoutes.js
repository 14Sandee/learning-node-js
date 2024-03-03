const express = require('express');
const { createReview, getAllReviews } = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(protect, restrictTo('user'), getAllReviews).post(createReview);

module.exports = router; 