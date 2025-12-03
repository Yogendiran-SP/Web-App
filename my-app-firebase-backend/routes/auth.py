from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from crud.auth import create_user, verify_user
from database.database import get_db
from schemas.users import (
    LoginRequest,
    TokenResponse,
    UserCreate,
    UserResponse,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(user, db)


@router.post("/login", response_model=TokenResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    return verify_user(credentials.email, credentials.password, db)
