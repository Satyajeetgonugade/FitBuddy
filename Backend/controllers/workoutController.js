const Workout = require('../models/workoutModel');

const addWorkout = async (req, res) => {
    const { workoutName, duration, date } = req.body;
    try {
        const workout = await Workout.create({ user: req.userId, workoutName, duration, date });
        res.status(201).send({ message: 'Workout added successfully!', workoutId: workout._id });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.userId });
        res.status(200).send(workouts);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    addWorkout,
    getWorkouts
};