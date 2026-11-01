from fastapi import APIRouter, File, UploadFile
from app.ml import model
from PIL import Image
import io

router = APIRouter()

@router.post("/")
async def recognize_food(foodImage: UploadFile = File(...)):
    image_data = await foodImage.read()
    image = Image.open(io.BytesIO(image_data))
    result = model.predict(image)
    return result
