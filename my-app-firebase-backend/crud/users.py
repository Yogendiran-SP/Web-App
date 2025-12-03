from fastapi import HTTPException
from sqlalchemy.orm import Session

from core.security import hash_password
from database.models import User
from schemas.users import UserUpdate


def get_users(db: Session):
    users = db.query(User).all()
    return users


def get_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user


def update_user(
    user_id: int,
    db: Session,
    updated_data: UserUpdate,
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")

    # Update only provided fields
    if updated_data.name is not None:
        user.name = updated_data.name  # type: ignore[assignment]
    if updated_data.email is not None:
        user.email = updated_data.email  # type: ignore[assignment]
    if updated_data.password is not None:
        user.hashed_password = hash_password(  # type: ignore[assignment]
            updated_data.password
        )

    db.commit()
    db.refresh(user)
    return user


def delete_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
