require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
    }
};

module.exports = { dbConnection };