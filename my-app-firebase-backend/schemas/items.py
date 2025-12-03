from pydantic import BaseModel


class ItemCreate(BaseModel):
    title: str
    description: str | None = None


class ItemResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    owner_id: int

    class Config:
        from_attributes = True
