require('dotenv').config();

const mongoose = require('mongoose');

module.exports = async function connect() {
    //Read db environments
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const db_name = process.env.DB_NAME;

    try {
        await mongoose.connect(`mongodb://${host}:${port}/${db_name}`);
        console.log(`Connect to MongoDB successfully!`);
    } catch(err) {
        console.log(`Failed to connect to MongoDB`, err);
    }
}
