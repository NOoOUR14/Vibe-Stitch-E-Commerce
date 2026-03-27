const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', reviewController.getAllReviews); 

router.post('/', reviewController.createReview);

router.get('/:productId', reviewController.getProductReviews);

module.exports = router;