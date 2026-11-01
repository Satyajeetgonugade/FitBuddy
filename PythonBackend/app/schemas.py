from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str = Field(..., alias="_id")

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class Meal(BaseModel):
    mealName: str
    calories: float
    protein: float
    carbs: float
    fats: float
    date: datetime

class Workout(BaseModel):
    workoutName: str
    duration: int
    date: datetime

class Settings(BaseModel):
    theme: str
    notifications: bool
