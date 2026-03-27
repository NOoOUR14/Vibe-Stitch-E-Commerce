const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: { type: String, required: [true, 'Review cannot be empty'] },
    rating: { type: Number, min: 1, max: 5 },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    },

status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending' 
}
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);