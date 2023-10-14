from fastapi import Depends
from sqlalchemy.orm import Session

from src.db.orm_db import get_session
from src.repositories.PurchasesRepository import PurchasesRepository
from src.repositories.UsersRepository import UsersRepository
from src.repositories.abstract.IPurchasesRepository import IPurchasesRepository
from src.repositories.abstract.IUsersRepository import IUsersRepository


def get_users_repo(db: Session = Depends(get_session)) -> IUsersRepository:
    return UsersRepository(db)

def get_purchases_repo(db: Session = Depends(get_session)) -> IPurchasesRepository:
    return PurchasesRepository(db)
