const Order = require('../models/orderModel');
const Product = require('../models/product'); 

exports.createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, totalPrice } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const order = await Order.create({
            user: req.user._id, 
            orderItems,
            shippingAddress,
            totalPrice
        });
        
        const bulkOptions = orderItems.map(item => {
            return {
                updateOne: {
                    filter: { _id: item.product },
                    update: { 
                        $inc: { quantity: -item.quantity, sold: +item.quantity } 
                    },
                },
            };
        });
        
        await Product.bulkWrite(bulkOptions);
        
        res.status(201).json({ 
            status: 'success', 
            data: order 
        });
    } catch (error) {
        res.status(400).json({ 
            status: 'fail',
            message: error.message 
        });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({ 
            status: 'success', 
            results: orders.length, 
            data: orders 
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};