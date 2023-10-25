import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { userRouter } from "./routes/user.routes";
import { mealRouter } from "./routes/meal.routes";
import { roomRouter } from "./routes/room.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
require('dotenv').config();
 
// const ATLAS_URI = process.env.ATLAS_URI;
const ATLAS_URI = "mongodb+srv://alandavidhenry:nl5wqcfpPzzVK1nU@mess-booking-app.sopvttk.mongodb.net/?retryWrites=true&w=majority"

if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in .env");
   process.exit(1);
};

const PORT = process.env.PORT || 5200;

if (!PORT) {
    console.error("No PORT environment variable has been defined in .env");
    process.exit(1);
};

const app = express();

app.use(cors());

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    // Try to connect
    try {
        await mongoose.connect(ATLAS_URI);
        console.log('MongoDB database connected using Mongoose');
    // If fails, log error
    } catch(err) {
        console.error(`Could not connect to MongoDB database ${err.message}`);
        process.exit(1);
    }
};
connectDB();

// Handle errors after connection
mongoose.connection.on('error', err => {
    console.log(err);
});

// Allow file export
module.exports = connectDB;

// Define routes
app.use("/users", userRouter);
app.use("/meals", mealRouter);
app.use("/rooms", roomRouter);

// start the Express server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});