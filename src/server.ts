import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { userRouter } from "./routes/user.routes";
import { mealRouter } from "./routes/meal.routes";
import { roomRouter } from "./routes/room.routes";
import 'dotenv/config';

// Load environment variables from the .env file if not set to 'production'
if (process.env.NODE_ENV !== 'production') {
    const ATLAS_URI = process.env.ATLAS_URI;
    if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in .env");
    process.exit(1);
    };

    const PORT = process.env.PORT || 5200;
    if (!PORT) {
        console.error("No PORT environment variable has been defined in .env");
        process.exit(1);
    };
};

// Connect to MongoDB
connectToDatabase(process.env.ATLAS_URI)
   .then(() => {
       const app = express();
       app.use(cors());
 
       // Start the Express server
       app.use("/users", userRouter);
       app.use("/meals", mealRouter);
       app.use("/rooms", roomRouter);
       app.listen(process.env.PORT, () => {
           console.log(`Server running at http://localhost:${process.env.PORT}`);
       });
 
   })
   .catch(error => console.error(error));