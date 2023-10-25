import mongoose from 'mongoose';
const { Schema } = mongoose

const MealSchema = new Schema({
   mealDate: { type: Date, required: true },
   mealType: [String],
   dietaryRequirements: String
});

module.exports = mongoose.model('Meal', MealSchema);