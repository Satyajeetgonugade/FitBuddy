const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/settings', authMiddleware, settingsController.updateSettings);
router.get('/settings', authMiddleware, settingsController.getSettings);

module.exports = router;