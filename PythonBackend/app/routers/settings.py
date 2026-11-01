from fastapi import APIRouter, Depends
from app import schemas, models, database
from app.routers.auth import get_current_user

router = APIRouter()

@router.put("/settings", response_model=schemas.Settings)
async def update_settings(settings: schemas.Settings, current_user: models.UserModel = Depends(get_current_user)):
    await database.db.settings.find_one_and_update(
        {"user": current_user["_id"]},
        {"$set": settings.dict()},
        upsert=True
    )
    return settings

@router.get("/settings", response_model=schemas.Settings)
async def get_settings(current_user: models.UserModel = Depends(get_current_user)):
    settings = await database.db.settings.find_one({"user": current_user["_id"]})
    if settings:
        return settings
    return schemas.Settings(theme="light", notifications=True)
