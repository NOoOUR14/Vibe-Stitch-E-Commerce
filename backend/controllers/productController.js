const Product = require('../models/product');

exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body); 
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); 
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        if (req.query.keyword) {
            const searchRegex = { $regex: req.query.keyword, $options: 'i' };
            
            queryObj.$or = [
                { name: searchRegex },
                { description: searchRegex },
                { gender: searchRegex }
            ];
            
            delete queryObj.keyword;
        }

        const products = await Product.find(queryObj);

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: products
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('reviews');
        if (!product) {
            return res.status(404).json({ message: 'No product found with that ID' });
        }
        res.status(200).json({ status: 'success', data: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } 
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'done product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};