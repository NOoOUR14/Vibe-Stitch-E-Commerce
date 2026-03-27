const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to a user']
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product', 
                required: true
            },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true } 
        }
    ],
    shippingAddress: {
        street: String,
        city: String,
        phone: { type: String, required: true }
    },
    totalPrice: { type: Number, default: 0.0 },
    isPaid: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);


