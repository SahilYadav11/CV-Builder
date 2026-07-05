require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

console.log("Starting backend server...")
connectToDB()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});