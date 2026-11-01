const Nutrition = require('../models/nutritionModel');

const addMeal = async (req, res) => {
    const { mealName, calories, protein, carbs, fats, date } = req.body;
    try {
        const meal = await Nutrition.create({ user: req.userId, mealName, calories, protein, carbs, fats, date });
        res.status(201).send({ message: 'Meal added successfully!', mealId: meal._id });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getMeals = async (req, res) => {
    try {
        const meals = await Nutrition.find({ user: req.userId });
        res.status(200).send(meals);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    addMeal,
    getMeals
};