from fastapi import FastAPI
from sqlalchemy import text
from routes import items, auth, users
from database.connection import engine, Base
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(items.router)
app.include_router(users.router)
app.include_router(auth.router)

origins = [
    "https://web-app-backend-o9gk.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "FastAPI backend is running"}


@app.get("/db")
def db():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 'Hello from NeonDB'"))
        return {"result": result.scalar()}
