from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from crud.items import (
    delete_item,
    get_items,
    create_item,
    get_item,
    update_item,
)
from database.database import get_db
from schemas.items import ItemCreate, ItemResponse


router = APIRouter()


@router.get("/items/", response_model=list[ItemResponse])
def list_items(db: Session = Depends(get_db)):
    return get_items(db)


@router.post("/items/", response_model=ItemResponse)
def add_item(item: ItemCreate, db: Session = Depends(get_db)):
    return create_item(item, db)


@router.get("/items/{item_id}", response_model=ItemResponse)
def list_item(item_id: int, db: Session = Depends(get_db)):
    return get_item(item_id, db)


@router.put("/items/{item_id}", response_model=ItemResponse)
def update_data(
    item_id: int,
    updated_data: ItemCreate,
    db: Session = Depends(get_db),
):
    return update_item(item_id, updated_data, db)


@router.delete("/items/{item_id}")
def remove_item(item_id: int, db: Session = Depends(get_db)):
    return delete_item(item_id, db)
