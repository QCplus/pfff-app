from typing import List, Optional
from sqlalchemy import text
from sqlalchemy.orm import Session

from src.db.entities.QueryEntity import QueryEntity
from src.models.api.CustomQueryModel import CustomQueryModel
from src.models.api.QueryResultModel import QueryResultModel
from src.models.api.QueryResultTable import QueryResultTable
from src.repositories.abstract.IQueriesRepository import IQueriesRepository


class QueriesRepository(IQueriesRepository):
    def __init__(self, db: Session) -> None:
        self.__db = db

    def add(self, query: QueryEntity) -> int:
        self.__db.add(query)
        self.__db.commit()

        return query.id

    def update(self, query: CustomQueryModel) -> None:
        self.__db.query(QueryEntity).where(QueryEntity.id == query.id).update({
            'title': query.title,
            'q': query.q
        })
        self.__db.commit()

    def get(self, id: int) -> Optional[CustomQueryModel]:
        entity = self.__db.query(QueryEntity).where(
            QueryEntity.id == id).one_or_none()

        return CustomQueryModel.from_entity(entity) if entity else None

    def get_all_queries(self) -> List[CustomQueryModel]:
        return CustomQueryModel.from_entities(
            self.__db.query(QueryEntity).all()
        )

    def delete(self, id: int) -> None:
        q = self.__db.query(QueryEntity).where(QueryEntity.id == id).one()
        self.__db.delete(q)

        self.__db.commit()

    def exec_by_id(self, id: int, count: int) -> QueryResultModel:
        query = self.__db.query(QueryEntity).where(QueryEntity.id == id).one()

        execute_cmd = self.__db.execute(text(query.q))

        data = QueryResultTable(
            rows=[[str(x) for x in r] for r in execute_cmd.fetchmany(count)],
            columns=[str(k) for k in execute_cmd.keys()]
        )

        return QueryResultModel(
            id=query.id,
            title=query.title,
            q=query.q,
            data=data,
            view_type=query.view_type
        )
