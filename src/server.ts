import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { userRouter } from "./user.routes";
import { mealRouter } from "./meal.routes";
import { roomRouter } from "./room.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { ATLAS_URI } = process.env;
console.log(ATLAS_URI);
const PORT = process.env.PORT || 5200;
 
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
 
connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = express();
       app.use(cors());
 
       // start the Express server
       app.use("/users", userRouter);
       app.use("/meals", mealRouter);
       app.use("/rooms", roomRouter);
       app.listen(PORT, () => {
           console.log(`Server running at http://localhost:${PORT}`);
       });
 
   })
   .catch(error => console.error(error));