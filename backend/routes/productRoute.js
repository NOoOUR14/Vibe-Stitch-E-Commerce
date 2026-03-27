const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.use(authMiddleware.protect); 
router.use(authMiddleware.restrictTo('admin'));

router.post('/', upload.single('image'), productController.addProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;