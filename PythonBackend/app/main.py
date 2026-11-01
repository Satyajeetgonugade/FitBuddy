from fastapi import FastAPI
from app.routers import auth, profile, workouts, nutrition, settings, recognize
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(profile.router, prefix="/api", tags=["profile"])
app.include_router(workouts.router, prefix="/api", tags=["workouts"])
app.include_router(nutrition.router, prefix="/api", tags=["nutrition"])
app.include_router(settings.router, prefix="/api", tags=["settings"])
app.include_router(recognize.router, prefix="/api/recognize", tags=["recognize"])

@app.get("/")
def read_root():
    return {"message": "Welcome to FitBuddy FastAPI backend"}
