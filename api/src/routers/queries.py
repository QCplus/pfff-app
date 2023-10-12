from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.db.orm_db import get_session
from src.deps import get_repos_factory, oauth2_scheme
from src.models.api.CustomQueryModel import CustomQueryModel
from src.models.api.QueryInfoModel import QueryInfoModel
from src.models.api.QueryResultModel import QueryResultModel
from src.services.RepositoriesFactory import RepositoriesFactory


router = APIRouter(
    prefix='/queries'
)


@router.get('/exec/{id}/{count}')
def exec_query(id: int,
               count: int = 10,
               factory: RepositoriesFactory = Depends(get_repos_factory),
               db: Session = Depends(get_session),
               token: str = Depends(oauth2_scheme)
               ) -> QueryResultModel:
    return factory.get_queries_repository(db).exec_by_id(id, count)


@router.get('')
def get_all_queries(factory: RepositoriesFactory = Depends(get_repos_factory),
                    db: Session = Depends(get_session),
                    token: str = Depends(oauth2_scheme)
                    ):
    return [QueryInfoModel(id=q.id, title=q.title) # type: ignore
            for q in factory.get_queries_repository(db).get_all_queries()]


@router.get('/{id}')
def get_query(id: int,
              factory: RepositoriesFactory = Depends(get_repos_factory),
              db: Session = Depends(get_session),
              token: str = Depends(oauth2_scheme)
              ) -> CustomQueryModel:
    return factory.get_queries_repository(db).get(id)


@router.post('')
def add_query(query: CustomQueryModel,
              factory: RepositoriesFactory = Depends(get_repos_factory),
              db: Session = Depends(get_session),
              token: str = Depends(oauth2_scheme)
              ) -> int:
    return factory.get_queries_repository(db).add(query.title, query.q)


@router.delete('/{id}')
def del_query(id: int,
              factory: RepositoriesFactory = Depends(get_repos_factory),
              db: Session = Depends(get_session),
              token: str = Depends(oauth2_scheme)
              ):
    factory.get_queries_repository(db).delete(id)


@router.put('')
def update_query(query: CustomQueryModel,
                 factory: RepositoriesFactory = Depends(get_repos_factory),
                 db: Session = Depends(get_session),
                 token: str = Depends(oauth2_scheme)
                 ):
    factory.get_queries_repository(db).update(query)
