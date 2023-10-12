from typing import List, Optional
from pydantic import BaseModel

from src.db.entities.QueryEntity import QueryEntity


class CustomQueryModel(BaseModel):
    id: Optional[int] = None
    title: str
    q: str

    @staticmethod
    def from_entity(e: QueryEntity):
        return CustomQueryModel(id=e.id,
                                title=e.title,
                                q=e.q)
    
    @staticmethod
    def from_entities(entities: List[QueryEntity]):
        return [CustomQueryModel.from_entity(e) for e in entities]
