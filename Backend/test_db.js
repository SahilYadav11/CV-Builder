require("dotenv").config();
const mongoose = require("mongoose");

async function run() {
    try {
        console.log("Connecting to database with URI:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("Connected successfully!");
        
        console.log("Attempting to count users...");
        const count = await mongoose.connection.db.collection("users").countDocuments();
        console.log("Count successful. Users count:", count);
    } catch (err) {
        console.error("Error occurred:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

run();
