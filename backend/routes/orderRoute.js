const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware.protect);

router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);

module.exports = router;