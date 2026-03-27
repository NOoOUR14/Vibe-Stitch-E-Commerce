const Review = require('../models/reviewModel');
exports.getAllReviews = async (req, res) => {
    try {
        const filter = req.query.status ? { status: req.query.status } : {};
        const reviews = await Review.find(filter).populate('productId').populate('userId');

        res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: { reviews }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createReview = async (req, res) => {
    try {
        const newReview = await Review.create({
            review: req.body.review,
            rating: req.body.rating,
            product: req.body.product,
            user: req.user._id 
        });

        res.status(201).json({
            status: 'success',
            data: newReview
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate('user', 'name'); 

        res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};