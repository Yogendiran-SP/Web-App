from database.models import Item
from schemas.items import ItemCreate
from sqlalchemy.orm import Session
from fastapi import HTTPException


def get_items(db: Session):
    items = db.query(Item).all()
    return items


def create_item(item: ItemCreate, db: Session):
    new_item = Item(title=item.title, description=item.description, owner_id=1)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


def get_item(item_id: int, db: Session):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item Not Found!")
    return item


def update_item(
    item_id: int,
    updated_data: ItemCreate,
    db: Session
):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item Not Found")
    # SQLAlchemy model attributes; type checkers may not infer these correctly.
    item.title = updated_data.title  # type: ignore[assignment]
    item.description = updated_data.description  # type: ignore[assignment]
    db.commit()
    db.refresh(item)
    return item


def delete_item(item_id: int, db: Session):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item Not Found")
    db.delete(item)
    db.commit()
    return {"message": "Item deleted successfully"}
