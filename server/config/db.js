const mongoose = require('mongoose');

const connection = async() => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection;