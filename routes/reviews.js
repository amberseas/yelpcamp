const express = require('express');
const router = express.Router({ mergeParams: true }); //because routes have separate params, and if we want to use params from main file we merge it
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
