from sqlalchemy.orm import Session

from src.repositories.PaymentsRepository import PaymentsRepository
from src.repositories.PurchasesRepository import PurchasesRepository
from src.repositories.QueriesRepository import QueriesRepository
from src.repositories.UsersRepository import UsersRepository
from src.repositories.abstract.IQueriesRepository import IQueriesRepository
from src.repositories.abstract.IUsersRepository import IUsersRepository


class RepositoriesFactory:
    def get_purchases_repository(self, db: Session):
        return PurchasesRepository(db)

    def get_payments_repository(self, db: Session):
        return PaymentsRepository(db)
    
    def get_queries_repository(self, db: Session) -> IQueriesRepository:
        return QueriesRepository(db)

    def get_users_repository(self, db: Session) -> IUsersRepository:
        return UsersRepository(db)
