const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/nutrition', authMiddleware, nutritionController.addMeal);
router.get('/nutrition', authMiddleware, nutritionController.getMeals);

module.exports = router;