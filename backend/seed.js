const mongoose = require('mongoose');
const faker = require('faker');
const path = require('path');

require('dotenv').config();
async function seed() {
try {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/vibeAndStitch';
    await mongoose.connect(mongoUrl);
    console.log("Connected!");

    await mongoose.connection.db.collection('products').drop().catch(e => console.log("Collection was already empty"));

    const products = [];
    const baseUrl = "http://localhost:5000/uploads/";

    for (let i = 1; i <= 12; i++) {
        if (i <= 11)
    products.push({
        name: `Men's Urban Style ${i}`,
        description: faker.commerce.productDescription(),
        price: 550 + (i*5),
        category: "ma10",
        gender: "men",
        image: `${baseUrl}man${i}.webp`, 
        quantity: 15
    });
    products.push({
        name: `Women's Pro Look ${i}`,
        description: faker.commerce.productDescription(),
        price: 650 + (i*5),
        category: "wo10",
        gender: "women",
        image: `${baseUrl}pro${i}.webp`, 
        quantity: 12
    });
    }

    await mongoose.connection.db.collection('products').insertMany(products);
    console.log("--- DONE! All real images are now in MongoDB ---");
    process.exit();

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
}

seed();