const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d'
    });
};

exports.register = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'user'
        });

        const token = createToken(newUser._id);

        res.status(200).json({
            status: 'success',
            token,
            data: { 
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }}
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = createToken(user._id);

        res.status(200).json({ 
            status: 'success', 
            token,
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role 
                }
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};