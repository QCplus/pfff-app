from typing import List, Optional

from src.db.entities.QueryEntity import QueryEntity
from src.models.api.CamelModel import CamelModel


class CustomQueryModel(CamelModel):
    id: int
    title: str
    q: str
    view_type: int

    @staticmethod
    def from_entity(e: QueryEntity):
        return CustomQueryModel(id=e.id,
                                title=e.title,
                                q=e.q,
                                view_type=e.view_type)

    @staticmethod
    def from_entities(entities: List[QueryEntity]):
        return [CustomQueryModel.from_entity(e) for e in entities]
