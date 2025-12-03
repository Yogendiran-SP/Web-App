from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from crud.users import delete_user, get_user, get_users, update_user
from database.database import get_db
from schemas.users import UserResponse, UserUpdate


router = APIRouter()


@router.get("/users/", response_model=list[UserResponse])
def list_users(db: Session = Depends(get_db)):
    return get_users(db)


@router.get("/users/{user_id}", response_model=UserResponse)
def list_user(user_id: int, db: Session = Depends(get_db)):
    return get_user(user_id, db)


@router.put("/users/{user_id}", response_model=UserResponse)
def update_data(
    user_id: int,
    updated_data: UserUpdate,
    db: Session = Depends(get_db),
):
    return update_user(user_id, db, updated_data)


@router.delete("/users/{user_id}")
def remove_user(user_id: int, db: Session = Depends(get_db)):
    return delete_user(user_id, db)
