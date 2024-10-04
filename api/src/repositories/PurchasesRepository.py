import datetime as dt
from typing import List, Optional
from sqlalchemy.orm import Session

from src.db.dto.NewPurchaseDto import NewPurchaseDto
from src.db.entities.PurchaseEntity import PurchaseEntity
from src.models.Purchase import Purchase
from src.repositories.abstract.IPurchasesRepository import IPurchasesRepository


class PurchasesRepository(IPurchasesRepository):
    def __init__(self, db: Session) -> None:
        self.__db = db

    def add(self, entity: NewPurchaseDto) -> int:
        db_entity = PurchaseEntity(price=entity.price,
                                   name=entity.name,
                                   quantity=entity.quantity,
                                   payment_time=entity.payment_time,
                                   shop=entity.shop,
                                   category=entity.category)

        self.__db.add(db_entity)
        self.__db.commit()

        return db_entity.id

    def add_list(self, entities: List[NewPurchaseDto]) -> None:
        for e in entities:
            self.__db.add(e.to_entity())

        self.__db.commit()

    def get_by_interval(self, start_date: dt.datetime, end_date: Optional[dt.datetime] = None) -> List[Purchase]:
        q = self.__db.query(PurchaseEntity).filter(
            PurchaseEntity.payment_time >= start_date).order_by(PurchaseEntity.payment_time.desc())
        if end_date:
            q = q.filter(PurchaseEntity.payment_time <= end_date)

        return [Purchase.from_db(r) for r in q.all()]

    def get_by_id(self, id: int) -> Optional[Purchase]:
        result = self.__db.query(PurchaseEntity).filter(
            PurchaseEntity.id == id).first()

        return None if result is None else Purchase.from_db(result)

    def get_all_tags(self) -> List[str]:
        return [r.category for r in
                self.__db
                .query(PurchaseEntity)
                .distinct()
                .group_by(PurchaseEntity.category)
                .where(PurchaseEntity.category != None)
                .where(PurchaseEntity.category != '')
                .all()]

    def update(self, entity: Purchase) -> None:
        q = self.__db \
            .query(PurchaseEntity) \
            .where(PurchaseEntity.id == entity.id) \
            .update(entity.__dict__)  # type: ignore
        self.__db.commit()
