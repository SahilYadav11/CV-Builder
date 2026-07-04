const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

// Correctly invoke cookieParser as middleware
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

// Auth and Interview Routes
const authrouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use("/api/auth", authrouter)
app.use("/api/interview", interviewRouter)

module.exports = app