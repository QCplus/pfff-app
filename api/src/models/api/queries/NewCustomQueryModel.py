from src.db.entities.QueryEntity import QueryEntity
from src.models.api.CamelModel import CamelModel


class NewCustomQueryModel(CamelModel):
    title: str
    q: str
    view_type: int

    def to_entity(self):
        return QueryEntity(title=self.title,
                           q=self.q,
                           view_type=self.view_type)
