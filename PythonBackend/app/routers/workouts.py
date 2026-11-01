from fastapi import APIRouter, Depends
from app import schemas, models, database
from app.routers.auth import get_current_user
from typing import List

router = APIRouter()

@router.post("/workouts", response_model=schemas.Workout)
async def add_workout(workout: schemas.Workout, current_user: models.UserModel = Depends(get_current_user)):
    workout_dict = workout.dict()
    workout_dict["user"] = current_user["_id"]
    new_workout = models.WorkoutModel(**workout_dict)
    await database.db.workouts.insert_one(new_workout.dict(by_alias=True))
    return new_workout

@router.get("/workouts", response_model=List[schemas.Workout])
async def get_workouts(current_user: models.UserModel = Depends(get_current_user)):
    workouts = await database.db.workouts.find({"user": current_user["_id"]}).to_list(1000)
    return workouts
