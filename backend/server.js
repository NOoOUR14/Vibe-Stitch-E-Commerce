const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ordersRoute = require('./routes/orderRoute');
const reviewRoute = require('./routes/reviewRoute');
const path = require('path');
const productRoutes = require('./routes/productRoute');



require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); 

app.use('/api/orders', ordersRoute);
app.use('/api/reviews', reviewRoute);

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/products',productRoutes)


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
res.send('Hello from the backend!');
});
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);

});