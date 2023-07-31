# models.py

from pydantic import BaseModel

class Character(BaseModel):
    file: str
    description: str
    name: str
    imageURL: str
