from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session

from src.db.orm_db import get_session
from src.deps import get_repos_factory, oauth2_scheme
from src.models.Payment import Payment
from src.services.RepositoriesFactory import RepositoriesFactory

router = APIRouter(
    prefix='/payments'
)


@router.post('/')
def add_payment(payment: Payment,
                factory: RepositoriesFactory = Depends(get_repos_factory),
                session: Session = Depends(get_session),
                token: str = Depends(oauth2_scheme)
                ) -> None:
    factory.get_payments_repository(session).add(payment)


@router.get('/tags')
def get_tags(factory: RepositoriesFactory = Depends(get_repos_factory),
             session: Session = Depends(get_session),
             token: str = Depends(oauth2_scheme)
             ) -> List[str]:
    return factory.get_payments_repository(session).get_all_tags()
