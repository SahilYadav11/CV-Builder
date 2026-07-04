//connection to database

const mongoose = require("mongoose")

async function connectToDB() {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error("CRITICAL ERROR: MONGO_URI environment variable is not defined!");
            return;
        }
        
        // Mask credentials in log for safety
        const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
        console.log(`Connecting to database at: ${maskedUri}...`);

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
        console.log("Database connection successful!")
    }
    catch (err) {
        console.error("CRITICAL DATABASE CONNECTION ERROR:", err.message)
    }
}
module.exports = connectToDB 