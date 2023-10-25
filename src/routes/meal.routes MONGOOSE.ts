import * as express from 'express';
import * as Meal from '../models/meal';
 
export const mealRouter = express.Router();
mealRouter.use(express.json());

// GET /meals
// mealRouter.get("/", async (_req, res) => {
//     try {
//         const meals = await collections.meals.find({}).toArray();
//         res.status(200).send(meals);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
//  });

mealRouter.get("/", async (_req, res) => {
    await Meal.insertOne
 });