from fastapi import APIRouter, Depends, HTTPException
from app import schemas, models, database
from app.routers.auth import get_current_user

router = APIRouter()

@router.get("/profile", response_model=schemas.User)
async def get_profile(current_user: models.UserModel = Depends(get_current_user)):
    return current_user

@router.put("/profile", response_model=schemas.User)
async def update_profile(user_update: schemas.UserBase, current_user: models.UserModel = Depends(get_current_user)):
    updated_user = await database.db.users.find_one_and_update(
        {"_id": current_user["_id"]},
        {"$set": user_update.dict()},
        return_document=True
    )
    return updated_user
