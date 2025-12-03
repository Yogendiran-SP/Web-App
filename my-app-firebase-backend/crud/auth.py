from typing import cast

from fastapi import HTTPException
from sqlalchemy.orm import Session

from core.jwt_handler import create_access_token
from core.security import hash_password, verify_password
from database.models import User
from schemas.users import UserCreate


def create_user(user: UserCreate, db: Session):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
        is_active=user.is_active,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def verify_user(email: str, password: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    hashed_password = cast(str, user.hashed_password)
    if not verify_password(password, hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}
