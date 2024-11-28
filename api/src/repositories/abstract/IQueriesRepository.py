from abc import ABC
from typing import List

from src.db.entities.QueryEntity import QueryEntity
from src.models.api.CustomQueryModel import CustomQueryModel
from src.models.api.QueryResultModel import QueryResultModel


class IQueriesRepository(ABC):
    def add(self, query: QueryEntity) -> int:
        raise NotImplementedError()

    def update(self, query: CustomQueryModel) -> None:
        raise NotImplementedError()

    def delete(self, id: int) -> None:
        raise NotImplementedError()

    def get(self, id: int) -> CustomQueryModel:
        raise NotImplementedError()

    def get_all_queries(self) -> List[CustomQueryModel]:
        raise NotImplementedError()

    def exec_by_id(self, id: int, count: int) -> QueryResultModel:
        raise NotImplementedError()
