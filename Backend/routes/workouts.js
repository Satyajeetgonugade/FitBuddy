const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/workouts', authMiddleware, workoutController.addWorkout);
router.get('/workouts', authMiddleware, workoutController.getWorkouts);

module.exports = router;