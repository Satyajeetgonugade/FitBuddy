from fastapi import APIRouter, Depends
from app import schemas, models, database
from app.routers.auth import get_current_user
from typing import List

router = APIRouter()

@router.post("/nutrition", response_model=schemas.Meal)
async def add_meal(meal: schemas.Meal, current_user: models.UserModel = Depends(get_current_user)):
    meal_dict = meal.dict()
    meal_dict["user"] = current_user["_id"]
    new_meal = models.NutritionModel(**meal_dict)
    await database.db.nutrition.insert_one(new_meal.dict(by_alias=True))
    return new_meal

@router.get("/nutrition", response_model=List[schemas.Meal])
async def get_meals(current_user: models.UserModel = Depends(get_current_user)):
    meals = await database.db.nutrition.find({"user": current_user["_id"]}).to_list(1000)
    return meals
