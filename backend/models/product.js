const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId,
    ref:'category',
    required: true }, 

  Image: { type: String, default:'uploads/default-placeholder.jpg' },
  quantity: { type: Number,
      required:[true, 'Please add a quantity for the product'],
      default: 0 },
  sold: { type: Number, 
    default: 0 
  },

  variants: [{
    color: String,
    sizes: [{
      size: String,
      stock: Number
    }]
  }],

  gender: { type: String, 
    required: [true, 'Please add a gender for the product(men, women, unisex)'],
    enum: ['men', 'women', 'unisex'] 
  },




  createdAt: { type: Date, default: Date.now }
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

productSchema.virtual('reviews', {
    ref: 'Review',         
    foreignField: 'product', 
    localField: '_id'       
});

module.exports = mongoose.models.Product || 
mongoose.model('Product', productSchema);