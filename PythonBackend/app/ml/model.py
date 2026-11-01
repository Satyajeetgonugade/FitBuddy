import tensorflowjs as tfjs
import numpy as np
from PIL import Image
import json
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'tf_model', 'model.json')
CLASS_NAMES_PATH = os.path.join(os.path.dirname(__file__), 'class_names.json')
NUTRITION_DATA_PATH = os.path.join(os.path.dirname(__file__), 'nutrition_data.json')

model = None
class_names = None
nutrition_data = None

def load_model():
    global model, class_names, nutrition_data
    if model is None:
        model = tfjs.converters.load_keras_model(MODEL_PATH)
        with open(CLASS_NAMES_PATH, 'r') as f:
            class_names = json.load(f)
        with open(NUTRITION_DATA_PATH, 'r') as f:
            nutrition_data = json.load(f)

def predict(image: Image.Image):
    load_model()
    image = image.resize((224, 224))
    image_array = np.array(image)
    image_array = np.expand_dims(image_array, axis=0)
    image_array = image_array / 255.0

    predictions = model.predict(image_array)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class_name = class_names[predicted_class_index]

    food_key = predicted_class_name.lower().replace(' ', '_')
    food_info = nutrition_data.get(food_key, nutrition_data['unknown'])

    return {
        "recognizedFood": predicted_class_name,
        "probability": float(predictions[0][predicted_class_index]),
        "nutrition": food_info
    }
