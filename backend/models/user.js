const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, 
    email: { type: String, required: true, unique: true, lowercase: true }, 
    password: { type: String, required: true, minlength: 6 }, 
    role: { type: String, enum: ['user', 'admin'], default: 'user' } 
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});


userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
        catch (error) {
        throw error;
    }

});

module.exports = mongoose.model('User', userSchema);