from typing import List, Optional
from sqlalchemy.orm import Session
import datetime as dt

from src.db.entities.PaymentEntity import PaymentEntity
from src.models.Payment import Payment
from src.repositories.abstract.IPaymentsRepository import IPaymentsRepository


class PaymentsRepository(IPaymentsRepository):
    def __init__(self, db: Session) -> None:
        self.__db = db

    def get_by_interval(self, start_date: dt.datetime, end_date: Optional[dt.datetime] = None) -> List[Payment]:
        q = self.__db.query(PaymentEntity).where(
            PaymentEntity.payment_time >= start_date)

        if end_date:
            q = q.where(PaymentEntity.payment_time <= end_date)

        return [Payment(payment_date=p.payment_time, amount=p.amount) for p in q.all()]

    def get_all_tags(self) -> List[str]:
        return []

    def add(self, entity: Payment) -> None:
        self.__db.add(PaymentEntity(payment_time=entity.payment_date,
                                    amount=entity.amount))
        self.__db.commit()

    def add_list(self, entities: List[Payment]) -> None:
        self.__db.add_all(
            [PaymentEntity(payment_time=e.payment_date, amount=e.amount) for e in entities])
        self.__db.commit()
