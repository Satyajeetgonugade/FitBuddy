const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

// Load nutritional data
const nutritionDataPath = path.join(__dirname, '..', 'nutrition_data.json');
const nutritionData = JSON.parse(fs.readFileSync(nutritionDataPath, 'utf8'));

// Resolve model directory (supports both tfjs_model and content/tfjs_model)
const modelDir = fs.existsSync(path.join(__dirname, '..', 'tfjs_model'))
  ? path.join(__dirname, '..', 'tfjs_model')
  : path.join(__dirname, '..', 'content', 'tfjs_model');

// Load class names (labels) from the trained model
const classNamesPath = path.join(modelDir, 'class_names.json');
const classNames = JSON.parse(fs.readFileSync(classNamesPath, 'utf8'));

let model;

// Load the custom-trained TensorFlow.js model
async function loadModel() {
  if (!model) {
    console.log('Loading custom TensorFlow.js model...');
    const modelPath = path.join(modelDir, 'model.json');
    // Use 'file://' prefix for loading local models in tfjs-node
    model = await tf.loadGraphModel('file://' + modelPath);
    console.log('Custom model loaded.');
  }
}

// Function to classify the image and get nutritional info
async function recognizeFood(req, res) {
  console.log('[TRACE] recognizeFood function started.');
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }

  try {
    await loadModel();

    // Decode image buffer to a tensor
    const imageTensor = tf.node.decodeImage(req.file.buffer, 3); // 3 for RGB channels
    
    // Resize the image to the model's expected input size (224x224)
    const resizedTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);
    
    // Normalize pixel values to [0, 1] and add a batch dimension
    const normalizedTensor = resizedTensor.div(255.0).expandDims(0);

    // Make a prediction
    const predictions = model.predict(normalizedTensor);
    
    // Get the class index with the highest probability
    const topPredictionIndex = predictions.argMax(1).dataSync()[0];
    
    // Get the predicted class name using our loaded labels
    const predictedClassName = classNames[topPredictionIndex];

    // Format the class name to match our JSON keys (e.g., "apple pie" -> "apple_pie")
    const foodKey = predictedClassName.toLowerCase().replace(/ /g, '_');

    // Find the nutritional info
    const foodInfo = nutritionData[foodKey] || nutritionData['unknown'];
    
    res.json({
      recognizedFood: predictedClassName,
      // For custom models, we don't get a direct probability like mobilenet.classify
      // We can calculate it from logits if needed, but for now, just indicate recognition
      probability: 1.0, // Placeholder, actual probability calculation is more involved
      nutrition: foodInfo
    });

  } catch (error) {
    console.error('Error during food recognition:', error);
    res.status(500).json({ error: 'Failed to process image.' });
  }
}

// Initial model load
(async () => {
  try {
    await loadModel();
  } catch (error) {
    console.error('Failed to load TensorFlow model:', error);
    process.exit(1); // Exit the process if the model fails to load
  }
})();

module.exports = {
  recognizeFood,
};