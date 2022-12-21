const Campground = require('../models/campground');
const Review = require('../models/review');

 async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    review.save();
    campground.save();
    req.flash('success', 'Review added.')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted.')
    res.redirect(`/campgrounds/${id}`)
}