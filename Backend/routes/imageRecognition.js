const express = require('express');
const router = express.Router();
const multer = require('multer');
const { recognizeFood } = require('../controllers/imageRecognitionController');

// Configure multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the food recognition route
// It expects a single file upload with the field name 'foodImage'
router.post('/', upload.single('foodImage'), recognizeFood);

module.exports = router;
